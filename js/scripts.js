var currentDataSet;
var currentSubCategory;
var currentImage = 0;
var lastClick = [0, 0];

function startup() {
    initData();
    initMenus();
    selectFirstCategoryOption();
    changeImage();
    document.addEventListener("click", function(event) {
        closeMenus(event);
    });
    document.getElementById("img").addEventListener("mousedown", imgClick);
}

function initMenus() {
    var optionsContainer = document.getElementById("categoryOptions");
    var optionTemplate = optionsContainer.getElementsByTagName("li")[0];
    optionsContainer.innerHTML = "";
    for (var i = 0; i < datasets.length; i++) {
        var option = datasets[i];
        var newOption = optionTemplate.cloneNode(true);
        var child = newOption.firstElementChild;
        child.setAttribute("value", i);
        child.innerHTML = option.name;
        optionsContainer.appendChild(newOption);
    }
}

function selectFirstCategoryOption() {
    var options = document.getElementById("categoryOptions");
    var firstOpt = options.getElementsByClassName("subMenuItem")[0];
    categorySelect(firstOpt);
}

function selectFirstSubCategoryOption() {
    if (currentDataSet.hasSub) {
        var options = document.getElementById("subCategoryOptions");
        var firstOpt = options.getElementsByClassName("subMenuItem")[0];
        subCategorySelect(firstOpt);
    } else {
        currentSubCategory = -1;
    }
}

function toggleMenu(button) {
    var parent = button.parentElement;
    if (hasClass(parent, "disabled")) {
        parent.classList.remove("open");
        return;
    }
    parent.classList.toggle("open");
}

function categorySelect(choice) {
    currentDataSet = getDataSet(choice.getAttribute("value"));
    toggleSelected(document.getElementById("categoryOptions"), choice);
    selectFirstSubCategoryOption();
    updateCategoryDisplay();
}

function subCategorySelect(choice) {
    currentSubCategory = choice.getAttribute("value");
    toggleSelected(document.getElementById("subCategoryMenu"), choice);
    updateCategoryDisplay();
}

function updateCategoryDisplay() {
    document.getElementById("currentCategory").innerHTML = currentDataSet.name;
    if (currentDataSet.hasSub) {
        if (currentSubCategory == TYPE_TALL) {
            document.getElementById("currentSubCategory").innerHTML = "Tall";
        } else {
            document.getElementById("currentSubCategory").innerHTML = "Short";
        }
        document.getElementById("subCategoryMenu").classList.remove("disabled");
    } else {
        document.getElementById("currentSubCategory").innerHTML = "";
        document.getElementById("subCategoryMenu").classList.add("disabled");
        document.getElementById("subCategoryMenu").classList.remove("open");
    }
    currentImage = 1;
    changeImage();
    initTable();
}

function toggleSelected(menu, choice) {
    var options = menu.getElementsByClassName("subMenuItem");
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        option.classList.remove("selected");
    }
    choice.classList.add("selected");
}

function hasClass(elem, classname) {
    return elem.classList.contains(classname);
}

function initTable() {
    var table = document.getElementById("dataTable");
    table.innerHTML = "";
    var thead = document.createElement("thead")
    var tbody = document.createElement("tbody");
    var tr;
    var th;
    var td;
    var headRow1 = document.createElement("tr");
    var headRow2 = document.createElement("tr");
    th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.innerHTML = "Frame";
    headRow1.appendChild(th);
    for (var i = 0; i < currentDataSet.headers.length; i++) {
        th = document.createElement("th");
        th.setAttribute("colspan", "2");
        th.innerHTML = currentDataSet.headers[i];
        headRow1.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "x";
        headRow2.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "y";
        headRow2.appendChild(th);
    }
    thead.appendChild(headRow1);
    thead.appendChild(headRow2);
    for (var i = 0; i < currentDataSet.getNumberOfImages(currentSubCategory); i++) {
        tr = document.createElement("tr");
        if (i == 0) {
            tr.classList.add("current");
        }
        td = document.createElement("td");
        td.innerHTML = "" + (i + 1);
        tr.appendChild(td);
        for (var j = 0; j < currentDataSet.headers.length; j++) {
            td = document.createElement("td");
            td.setAttribute("row", "" + i);
            td.setAttribute("col", "" + j);
            td.onmouseover = function() { tableHover(this); };
            td.onmouseleave = function() { tableLeave(this); };
            td.onclick = function() { tableClick(this); };
            tr.appendChild(td);
            td = document.createElement("td");
            td.setAttribute("row", "" + i);
            td.setAttribute("col", "" + j);
            td.onmouseover = function() { tableHover(this); };
            td.onmouseleave = function() { tableLeave(this); };
            td.onclick = function() { tableClick(this); };
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
}

function tableHover(cell) {
    var row = parseInt(cell.getAttribute("row"));
    var col = 1 + 2 * parseInt(cell.getAttribute("col"));
    var table = document.getElementById("dataTable");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.rows[row].cells[col].classList.add("highlight");
    tbody.rows[row].cells[col + 1].classList.add("highlight");
}

function tableLeave(cell) {
    var row = parseInt(cell.getAttribute("row"));
    var col = 1 + 2 * parseInt(cell.getAttribute("col"));
    var table = document.getElementById("dataTable");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.rows[row].cells[col].classList.remove("highlight");
    tbody.rows[row].cells[col + 1].classList.remove("highlight");
}

function tableClick(cell) {
    var row = parseInt(cell.getAttribute("row"));
    var col = 1 + 2 * parseInt(cell.getAttribute("col"));
    if (lastClick[0] && lastClick[1]) {
        if ((row + 1) == currentImage) {
            var table = document.getElementById("dataTable");
            var tbody = table.getElementsByTagName("tbody")[0];
            tbody.rows[row].cells[col].innerHTML = lastClick[0];
            tbody.rows[row].cells[col + 1].innerHTML = lastClick[1];
        }
    }
}

function closeMenus(event) {
    var targetElement = event.target;
    var menu = document.getElementById("menu");
    do {
        if (targetElement == menu) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    var categoryMenu = document.getElementById("categoryMenu");
    var subCategoryMenu = document.getElementById("subCategoryMenu");
    categoryMenu.classList.remove("open");
    subCategoryMenu.classList.remove("open");
}

function changeImage() {
    var img = document.getElementById("img");
    var source = "./images/" + currentDataSet.imageDir + "/" + getSubCategory(currentSubCategory) + currentDataSet.image;
    if (currentDataSet.getNumberOfImages(currentSubCategory) > 1) {
        source += "" + currentImage;
    }
    source += ".jpg";
    img.src = source;
    img.setAttribute("width", currentDataSet.imgWidth);
    img.setAttribute("height", currentDataSet.imgHeight);
    var tbody = document.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].classList.remove("current");
        if ((i + 1) == currentImage) {
            rows[i].classList.add("current");
        }
    }
    document.getElementById("currentImage").innerHTML = currentImage;
    document.getElementById("totalImages").innerHTML = currentDataSet.getNumberOfImages(currentSubCategory);
}

function nextImage() {
    if (currentImage < currentDataSet.getNumberOfImages(currentSubCategory)) {
        currentImage++;
    } else {
        currentImage = 1;
    }
    changeImage();
}

function prevImage() {
    if (currentImage > 1) {
        currentImage--;
    } else {
        currentImage = currentDataSet.getNumberOfImages(currentSubCategory);
    }
    changeImage();
}

function imgClick(evt) {
    var img = document.getElementById("img");
    var rect = img.getBoundingClientRect();
    lastClick[0] = Math.round(evt.clientX - rect.left);
    lastClick[1] = Math.round(rect.bottom - evt.clientY);
    document.getElementById("lastX").innerHTML = lastClick[0];
    document.getElementById("lastY").innerHTML = lastClick[1];
}

function generateCSV() {
    table2CSV(document.getElementById("dataTable"), currentDataSet);
}
