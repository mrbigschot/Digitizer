let digitizer;
let data;

function startup() {
    digitizer = new Digitizer();
    data = new DigitizerData();
    initMenus();
    selectFirstCategoryOption();

    document.addEventListener("click", function(event) { closeMenus(event); });
    document.getElementById("dataset_image").addEventListener("mousedown", imageClicked);
}

// Digitizer accessor wrappers
function getCurrentDataset() { return digitizer.dataset; }
function getCurrentSubCategory() { return digitizer.subCategory; }
function getCurrentImageIndex() { return digitizer.imageIndex; }
function toggleGuidedMode() {
    digitizer.toggleGuidedMode();
    updatePrompt();
    if (digitizer.guidedMode) {
        highlightCellsAtDataPoint(getCurrentImageIndex() - 1, digitizer.datapointIndex, true);
    } else {
        highlightCellsAtDataPoint(getCurrentImageIndex() - 1, digitizer.datapointIndex, false);
    }
}

// DigitizerData accessor wrappers
function getDatasets() { return data.datasets; }

function updateClickPositionDisplay() {
    if (digitizer.hasClickPosition()) {
        document.getElementById("clickCoordinates").innerHTML = "(" + digitizer.clickPosition.x + ", " + digitizer.clickPosition.y + ")";
    } else {
        document.getElementById("clickCoordinates").innerHTML = "( , )";
    }
}
function updatePrompt() {
    let newPrompt = digitizer.getPrompt();
    let promptElem = document.getElementById("promptContent");
    if (newPrompt != promptElem.innerHTML) {
        promptElem.classList.add("loading");
        setTimeout(() => {
            promptElem.innerHTML = newPrompt;
            promptElem.classList.remove("loading");
        }, 250);
    }
}

function initMenus() {
    let optionsContainer = document.getElementById("categoryOptions");
    let optionTemplate = optionsContainer.getElementsByTagName("li")[0];
    optionsContainer.innerHTML = "";
    for (let ii = 0; ii < getDatasets().length; ii++) {
        let dataset = data.getDataset(ii);
        let newOption = optionTemplate.cloneNode(true);
        let child = newOption.firstElementChild;
        child.setAttribute("data-value", ii);
        child.innerHTML = dataset.name;
        optionsContainer.appendChild(newOption);
    }
    document.getElementById("select_subcategory_maxi").setAttribute("data-value", SUBCAT_MAXI);
    document.getElementById("select_subcategory_mini").setAttribute("data-value", SUBCAT_MINI);
}

function selectFirstCategoryOption() {
    let options = document.getElementById("categoryOptions");
    let firstOpt = options.getElementsByClassName("subMenuItem")[0];
    selectCategory(firstOpt);
}
function selectFirstSubCategoryOption() {
    if (getCurrentDataset().hasSub) {
        let options = document.getElementById("subCategoryOptions");
        let firstOpt = options.getElementsByClassName("subMenuItem")[0];
        digitizer.setSubCategory(parseInt(firstOpt.getAttribute("data-value")));
        toggleSelected(document.getElementById("subCategoryMenu"), firstOpt);
    } else {
        digitizer.setSubCategory(SUBCAT_NONE);
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
function toggleSelected(menu, choice) {
    let options = menu.getElementsByClassName("subMenuItem");
    for (let ii = 0; ii < options.length; ii++) {
        let option = options[ii];
        option.classList.remove("selected");
    }
    choice.classList.add("selected");
}
function closeMenus(event) {
    if (event) {
        let targetElement = event.target;
        let menu = document.getElementById("menu");
        do {
            if (targetElement == menu) { return; }
            targetElement = targetElement.parentNode;
        } while (targetElement);
    }
    let categoryMenu = document.getElementById("categoryMenu");
    let subCategoryMenu = document.getElementById("subCategoryMenu");
    categoryMenu.classList.remove("open");
    subCategoryMenu.classList.remove("open");
}

// methods for loading a new dataset/subcategory
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
        updateClickPositionDisplay();
        updatePrompt();
        delayFunction(() => { resolve(); });
    });
}
function endLoading() {
    return new Promise((resolve) => {
        document.getElementById("content").classList.remove("loading");
        closeMenus();
        delayFunction(() => { resolve(); }, 300);
    });
}
async function selectCategory(choice) {
    await startLoading();
    await doLoading(() => {
        digitizer.setDataset(data.getDataset(choice.getAttribute("data-value")));
        toggleSelected(document.getElementById("categoryOptions"), choice);
        selectFirstSubCategoryOption();
        changeDatasetSelection();
    });
    await endLoading();
}
async function selectSubCategory(choice) {
    await startLoading()
    await doLoading(() => {
        digitizer.setSubCategory(parseInt(choice.getAttribute("data-value")));
        toggleSelected(document.getElementById("subCategoryMenu"), choice);
        changeDatasetSelection();
    });
    await endLoading();
}

function changeDatasetSelection() {
    updateImage();
    initTable();
    updateDatasetDisplay();
}
function updateDatasetDisplay() {
    document.getElementById("currentCategory").innerHTML = getCurrentDataset().name;
    if (getCurrentDataset().hasSub) {
        if (getCurrentSubCategory() == SUBCAT_MAXI) {
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

function hasClass(elem, classname) {
    return elem.classList.contains(classname);
}

function initTable() {
    let table = document.getElementById("dataTable");
    table.innerHTML = "";
    table.appendChild(initTableHeader());
    table.appendChild(initTableBody());
    if (digitizer.guidedMode) {
        highlightCellsAtDataPoint(getCurrentImageIndex() - 1, digitizer.datapointIndex, true);
    }
}
function initTableHeader() {
    let thead = document.createElement("thead")
    let headRow1 = document.createElement("tr");
    headRow1.classList.add("headerRow1");
    let headRow2 = document.createElement("tr");
    headRow2.classList.add("headerRow2");

    headRow1.appendChild(createTableHeaderCell(null, "2", "Frame", null));
    for (let ii = 0; ii < getCurrentDataset().datapoints.length; ii++) {
        headRow1.appendChild(createTableHeaderCell("2", null, getCurrentDataset().datapoints[ii][0], getCurrentDataset().datapoints[ii][1]));
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
function initTableBody() {
    let tbody = document.createElement("tbody");
    let tr, td;
    for (let ii = 0; ii < getCurrentDataset().getNumberOfImages(getCurrentSubCategory()); ii++) {
        tr = document.createElement("tr");
        if (ii == 0) { tr.classList.add("current"); }
        td = document.createElement("td");
        td.innerHTML = "" + (ii + 1);
        tr.appendChild(td);
        for (let jj = 0; jj < getCurrentDataset().datapoints.length; jj++) {
            td = document.createElement("td");
            td.setAttribute("data-row", "" + ii);
            td.setAttribute("data-col", "" + jj);
            td.onmouseover = function() { tableHover(this); };
            td.onmouseleave = function() { tableLeave(this); };
            td.onclick = function() { tableClick(this); };
            tr.appendChild(td);
            td = document.createElement("td");
            td.setAttribute("data-row", "" + ii);
            td.setAttribute("data-col", "" + jj);
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
    if (!digitizer.guidedMode) {
        let row = getCellRow(cell);
        let col = getRealCellColumn(cell);
        highlightCells(row, col, true);
    }
}
function tableLeave(cell) {
    if (!digitizer.guidedMode) {
        let row = getCellRow(cell);
        let col = getRealCellColumn(cell);
        highlightCells(row, col, false);
    }
}
function tableClick(cell) {
    if (!digitizer.guidedMode) {
        let row = getCellRow(cell);
        let col = getRealCellColumn(cell);
        if (digitizer.hasClickPosition() && (row + 1) == getCurrentImageIndex()) {
            populateTableCells(row, col);
        }
    }
}
function highlightCellsAtDataPoint(row, datapointIndex, highlight) {
    highlightCells(row, 1 + (datapointIndex * 2), highlight);
}
function highlightCells(row, col, highlight) {
    let table = document.getElementById("dataTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    if (highlight) {
        tbody.rows[row].cells[col].classList.add("highlight");
        tbody.rows[row].cells[col + 1].classList.add("highlight");
    } else {
        tbody.rows[row].cells[col].classList.remove("highlight");
        tbody.rows[row].cells[col + 1].classList.remove("highlight");
    }
}
function populateTableCellsAtDataPoint(row, datapointIndex) {
    populateTableCells(row, 1 + (datapointIndex * 2));
}
function populateTableCells(row, col) {
    let table = document.getElementById("dataTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    tbody.rows[row].cells[col].innerHTML = digitizer.clickPosition.x;
    tbody.rows[row].cells[col + 1].innerHTML = digitizer.clickPosition.y;
}
function getCellRow(cell) { return parseInt(cell.getAttribute("data-row")); }
function getCellColumn(cell) { return parseInt(cell.getAttribute("data-col")); }
function getRealCellColumn(cell) { return 1 + (2 * getCellColumn(cell)); }

function updateImage() {
    let img = document.getElementById("dataset_image");
    let source = "./images/" + getCurrentDataset().imageDir + "/" + data.getSubCategoryPrefix(getCurrentSubCategory()) + getCurrentDataset().image;
    if (getCurrentDataset().getNumberOfImages(getCurrentSubCategory()) > 1) { source += "" + getCurrentImageIndex(); }
    source += ".jpg";
    img.src = source;
    img.setAttribute("width", getCurrentDataset().imgWidth);
    img.setAttribute("height", getCurrentDataset().imgHeight);
    let tbody = document.getElementsByTagName("tbody")[0];
    let rows = tbody.getElementsByTagName("tr");
    for (let ii = 0; ii < rows.length; ii++) {
        rows[ii].classList.remove("current");
        if ((ii + 1) == getCurrentImageIndex()) {
            rows[ii].classList.add("current");
        }
    }
    document.getElementById("currentImage").innerHTML = getCurrentImageIndex();
    document.getElementById("totalImages").innerHTML = getCurrentDataset().getNumberOfImages(getCurrentSubCategory());
}
function nextImage() {
    if (digitizer.guidedMode) {
        highlightCellsAtDataPoint(getCurrentImageIndex() - 1, digitizer.datapointIndex, false);
    }
    digitizer.nextImage();
    updateImage();
    if (digitizer.guidedMode) {
        highlightCellsAtDataPoint(getCurrentImageIndex() - 1, digitizer.datapointIndex, true);
    }
}
function prevImage() {
    if (digitizer.guidedMode) {
        highlightCellsAtDataPoint(getCurrentImageIndex() - 1, digitizer.datapointIndex, false);
    }
    digitizer.previousImage();
    updateImage();
    if (digitizer.guidedMode) {
        highlightCellsAtDataPoint(getCurrentImageIndex() - 1, digitizer.datapointIndex, true);
    }
}
function imageClicked(evt) {
    let img = document.getElementById("dataset_image");
    let rect = img.getBoundingClientRect();
    let x = Math.round(evt.clientX - rect.left);
    let y = Math.round(rect.bottom - evt.clientY);
    digitizer.processClickPosition(x, y);
    updateClickPositionDisplay();
    updatePrompt();
}

function generateCSV() { data.table2CSV(document.getElementById("dataTable"), getCurrentDataset(), getCurrentSubCategory()); }