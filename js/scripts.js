var currentDataSet;
var currentSubCategory;
var currentImage = 0;
var lastClick = {
    x: null,
    y: null
};
function setLastClickPosition(x, y) {
    lastClick.x = x;
    lastClick.y = y;
    if (lastClick.x && lastClick.y) {
        document.getElementById("clickCoordinates").innerHTML = "(" + lastClick.x + ", " + lastClick.y + ")";
        document.getElementById("promptContent").innerHTML = "Click a table cell to transfer coordinates";
    } else {
        document.getElementById("clickCoordinates").innerHTML = "( , )";
        document.getElementById("promptContent").innerHTML = "Click on the image to get coordinates";
    }
}
function resetClickCoordinates() {
    setLastClickPosition(null, null);
}

function startup() {
    initData();
    initMenus();
    selectFirstCategoryOption();
    document.addEventListener("click", function(event) {  closeMenus(event); });
    document.getElementById("img").addEventListener("mousedown", imageClicked);
}

function initMenus() {
    let optionsContainer = document.getElementById("categoryOptions");
    let optionTemplate = optionsContainer.getElementsByTagName("li")[0];
    optionsContainer.innerHTML = "";
    for (let ii = 0; ii < datasets.length; ii++) {
        let option = datasets[ii];
        let newOption = optionTemplate.cloneNode(true);
        let child = newOption.firstElementChild;
        child.setAttribute("value", ii);
        child.innerHTML = option.name;
        optionsContainer.appendChild(newOption);
    }
}

function selectFirstCategoryOption() {
    let options = document.getElementById("categoryOptions");
    let firstOpt = options.getElementsByClassName("subMenuItem")[0];
    categorySelect(firstOpt);
}
function selectFirstSubCategoryOption() {
    if (currentDataSet.hasSub) {
        let options = document.getElementById("subCategoryOptions");
        let firstOpt = options.getElementsByClassName("subMenuItem")[0];
        currentSubCategory = parseInt(firstOpt.getAttribute("value"));
        toggleSelected(document.getElementById("subCategoryMenu"), firstOpt);
    } else {
        currentSubCategory = -1;
    }
}

function toggleMenu(button) {
    let parent = button.parentElement;
    if (hasClass(parent, "disabled")) {
        parent.classList.remove("open");
    } else {
        parent.classList.toggle("open");
    }
}

function delayFunction(func, time=500) { setTimeout(func, time); }
function startLoading() {
    return new Promise((resolve) => {
        document.getElementById("content").classList.add("loading");
        delayFunction(() => { resolve(); }, 300);
    });
}
function doLoading(loadFunction) {
    return new Promise((resolve) => {
        loadFunction.call();
        delayFunction(() => { resolve(); });
    });
}
function endLoading() {
    return new Promise((resolve) => {
        document.getElementById("content").classList.remove("loading");
        delayFunction(() => { resolve(); }, 300);
    });
}
async function categorySelect(choice) {
    await startLoading();
    await doLoading(() => {
        currentDataSet = getDataSet(choice.getAttribute("value"));
        toggleSelected(document.getElementById("categoryOptions"), choice);
        selectFirstSubCategoryOption();
        changeCategorySelection();
    });
    await endLoading();
}
async function subCategorySelect(choice) {
    await startLoading()
    await doLoading(() => {
        currentSubCategory = parseInt(choice.getAttribute("value"));
        toggleSelected(document.getElementById("subCategoryMenu"), choice);
        changeCategorySelection();
    });
    await endLoading();
}

function changeCategorySelection() {
    currentImage = 1;
    updateImage();
    initTable();
    updateCategoryDisplay();
}
function updateCategoryDisplay() {
    document.getElementById("currentCategory").innerHTML = currentDataSet.name;
    if (currentDataSet.hasSub) {
        if (currentSubCategory == TYPE_TALL) {
            document.getElementById("currentSubCategory").innerHTML = "Maxi";
        } else {
            document.getElementById("currentSubCategory").innerHTML = "Mini";
        }
        document.getElementById("subCategoryMenu").classList.remove("disabled");
    } else {
        document.getElementById("currentSubCategory").innerHTML = "";
        document.getElementById("subCategoryMenu").classList.add("disabled");
        document.getElementById("subCategoryMenu").classList.remove("open");
    }
}

function toggleSelected(menu, choice) {
    let options = menu.getElementsByClassName("subMenuItem");
    for (let ii = 0; ii < options.length; ii++) {
        let option = options[ii];
        option.classList.remove("selected");
    }
    choice.classList.add("selected");
}

function hasClass(elem, classname) {
    return elem.classList.contains(classname);
}

function initTable() {
    let table = document.getElementById("dataTable");
    table.innerHTML = "";
    table.appendChild(initTableHeader(table));
    table.appendChild(initTableBody(table));
}
function initTableHeader(table) {
    let thead = document.createElement("thead")
    let headRow1 = document.createElement("tr");
    headRow1.classList.add("headerRow1");
    let headRow2 = document.createElement("tr");
    headRow2.classList.add("headerRow2");

    headRow1.appendChild(createTableHeaderCell(null, "2", "Frame", null));
    for (let ii = 0; ii < currentDataSet.datapoints.length; ii++) {
        headRow1.appendChild(createTableHeaderCell("2", null, currentDataSet.datapoints[ii][0], currentDataSet.datapoints[ii][1]));
        headRow2.appendChild(createTableHeaderCell(null, null, "x"));
        headRow2.appendChild(createTableHeaderCell(null, null, "y"));
    }
    thead.appendChild(headRow1);
    thead.appendChild(headRow2);

    return thead;
}
function createTableHeaderCell(colSpan, rowSpan, value, title) {
    let th = document.createElement("th");
    if (colSpan) th.setAttribute("colspan", colSpan);
    if (rowSpan) th.setAttribute("rowspan", rowSpan);
    th.innerHTML = value;
    if (title) th.setAttribute("title", title);
    return th;
}
function initTableBody(table) {
    let tbody = document.createElement("tbody");
    let tr, td;
    for (let ii = 0; ii < currentDataSet.getNumberOfImages(currentSubCategory); ii++) {
        tr = document.createElement("tr");
        if (ii == 0) { tr.classList.add("current"); }
        td = document.createElement("td");
        td.innerHTML = "" + (ii + 1);
        tr.appendChild(td);
        for (let jj = 0; jj < currentDataSet.datapoints.length; jj++) {
            td = document.createElement("td");
            td.setAttribute("row", "" + ii);
            td.setAttribute("col", "" + jj);
            td.onmouseover = function() { tableHover(this); };
            td.onmouseleave = function() { tableLeave(this); };
            td.onclick = function() { tableClick(this); };
            tr.appendChild(td);
            td = document.createElement("td");
            td.setAttribute("row", "" + ii);
            td.setAttribute("col", "" + jj);
            td.onmouseover = function() { tableHover(this); };
            td.onmouseleave = function() { tableLeave(this); };
            td.onclick = function() { tableClick(this); };
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    return tbody;
}
function tableHover(cell) {
    let row = getCellRow(cell);
    let xColumnIndex = getRealCellColumn(cell);
    let table = document.getElementById("dataTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    tbody.rows[row].cells[xColumnIndex].classList.add("highlight");
    tbody.rows[row].cells[xColumnIndex + 1].classList.add("highlight");
}
function tableClick(cell) {
    let row = getCellRow(cell);
    let col = getRealCellColumn(cell);
    if (lastClick.x && lastClick.y) {
        if ((row + 1) == currentImage) {
            let table = document.getElementById("dataTable");
            let tbody = table.getElementsByTagName("tbody")[0];
            tbody.rows[row].cells[col].innerHTML = lastClick.x;
            tbody.rows[row].cells[col + 1].innerHTML = lastClick.y;
        }
    }
}
function tableLeave(cell) {
    let row = getCellRow(cell);
    let xColumnIndex = getRealCellColumn(cell);
    let table = document.getElementById("dataTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    tbody.rows[row].cells[xColumnIndex].classList.remove("highlight");
    tbody.rows[row].cells[xColumnIndex + 1].classList.remove("highlight");
}
function getCellRow(cell) { return parseInt(cell.getAttribute("row")); }
function getCellColumn(cell) { return parseInt(cell.getAttribute("col")); }
function getRealCellColumn(cell) { return 1 + 2 * getCellColumn(cell); }

function closeMenus(event) {
    let targetElement = event.target;
    let menu = document.getElementById("menu");
    do {
        if (targetElement == menu) { return; }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    let categoryMenu = document.getElementById("categoryMenu");
    let subCategoryMenu = document.getElementById("subCategoryMenu");
    categoryMenu.classList.remove("open");
    subCategoryMenu.classList.remove("open");
}

function updateImage() {
    let img = document.getElementById("img");
    let source = "./images/" + currentDataSet.imageDir + "/" + getSubCategory(currentSubCategory) + currentDataSet.image;
    if (currentDataSet.getNumberOfImages(currentSubCategory) > 1) { source += "" + currentImage; }
    source += ".jpg";
    img.src = source;
    img.setAttribute("width", currentDataSet.imgWidth);
    img.setAttribute("height", currentDataSet.imgHeight);
    let tbody = document.getElementsByTagName("tbody")[0];
    let rows = tbody.getElementsByTagName("tr");
    for (let ii = 0; ii < rows.length; ii++) {
        rows[ii].classList.remove("current");
        if ((ii + 1) == currentImage) {
            rows[ii].classList.add("current");
        }
    }
    document.getElementById("currentImage").innerHTML = currentImage;
    document.getElementById("totalImages").innerHTML = currentDataSet.getNumberOfImages(currentSubCategory);
    resetClickCoordinates();
}
function nextImage() {
    if (currentImage < currentDataSet.getNumberOfImages(currentSubCategory)) {
        currentImage++;
    } else {
        currentImage = 1;
    }
    updateImage();
}
function prevImage() {
    if (currentImage > 1) {
        currentImage--;
    } else {
        currentImage = currentDataSet.getNumberOfImages(currentSubCategory);
    }
    updateImage();
}

function imageClicked(evt) {
    let img = document.getElementById("img");
    let rect = img.getBoundingClientRect();
    setLastClickPosition(Math.round(evt.clientX - rect.left), Math.round(rect.bottom - evt.clientY));
}

function generateCSV() { table2CSV(document.getElementById("dataTable"), currentDataSet); }
