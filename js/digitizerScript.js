var slide = 0;
var nSlides;
var headers = [];
var lastClick = [];
var project = "";
var image = "";
var w, h;
var table = document.getElementById("data");
var type = "T";
var sel;
var flag = false;
var single = false;

init();

function init() {
    setupEvents();
    menu("balltoss");
}

function setupEvents() {
    document.getElementById("img").addEventListener("mousedown", function () {
        imgClick(event);
    }, false);
    document.getElementById("nxtbtn").addEventListener("click", nxtbtnClick, false);
    document.getElementById("prvbtn").addEventListener("click", prvbtnClick, false);
    setupTable();
}

function setupTable() {
    if (table !== null) {
        for (var i = 2; i < table.rows.length; i++) {
            for (var j = 1; j < table.rows[i].cells.length; j++) {
                table.rows[i].cells[j].onclick = function () {
                    tableClick(this);
                };
                table.rows[i].cells[j].onmouseover = function () {
                    tableHover(this);
                };
                table.rows[i].cells[j].onmouseleave = function () {
                    tableLeave(this);
                };
            }
        }
    }
}

function imgClick(evt) {
    $(document).ready(function () {
        $("img").on("click", function (evt) {
            lastClick[0] = parseInt(evt.pageX - $("img").offset().left);
            lastClick[1] = parseInt($("img").height() - (evt.pageY - $("img").offset().top));
            document.getElementById("prompt").innerHTML = "Last click: (" +
                    lastClick[0] + ", " + lastClick[1] + ")";
        });
    });
}

function nxtbtnClick() {
    if (slide < nSlides) {
        slide++;
        changeImage();
        if (!flag) {
            table.rows[slide].cells[0].style.backgroundColor = "#e1e1e1";
            table.rows[slide + 1].cells[0].style.backgroundColor = "#ffffff";
        }
    }
}

function prvbtnClick() {
    if (slide > 1) {
        slide--;
        changeImage();
        if (!flag) {
            table.rows[slide + 2].cells[0].style.backgroundColor = "#e1e1e1";
            table.rows[slide + 1].cells[0].style.backgroundColor = "#ffffff";
        }
    }
}

function stsClick() {
    project = "STS";
    image = "FSS";
    nSlides = 8;
    headers = [];
    slide = 1;
    changeImage();
    initTable();
    setSelected("sts");
}

function tableClick(tableCell) {
    var loc = tableCell.id.split('-');
    var row = parseInt(loc[0]);
    var col = parseInt(loc[1]);
    if (lastClick[0] && lastClick[1]) {
        if (flag) {
            if (Math.ceil(col / 2) === slide) {
                if (col % 2 !== 0) {
                    table.rows[row + 1].cells[col].innerHTML = lastClick[0];
                    table.rows[row + 1].cells[col + 1].innerHTML = lastClick[1];
                } else {
                    table.rows[row + 1].cells[col - 1].innerHTML = lastClick[0];
                    table.rows[row + 1].cells[col].innerHTML = lastClick[1];
                }
            }
        } else {
            if (row === slide) {
                if (col % 2 !== 0) {
                    table.rows[row + 1].cells[col].innerHTML = lastClick[0];
                    table.rows[row + 1].cells[col + 1].innerHTML = lastClick[1];
                } else {
                    table.rows[row + 1].cells[col - 1].innerHTML = lastClick[0];
                    table.rows[row + 1].cells[col].innerHTML = lastClick[1];
                }
            }
        }
    }
}

function tableHover(cell) {
    var loc = cell.id.split('-');
    var row = parseInt(loc[0]);
    var col = parseInt(loc[1]);
    if (flag) {
        if (col % 2 !== 0) {
            table.rows[row + 1].cells[col].style.backgroundColor = 'white';
            table.rows[row + 1].cells[col + 1].style.backgroundColor = 'white';
        } else {
            table.rows[row + 1].cells[col - 1].style.backgroundColor = 'white';
            table.rows[row + 1].cells[col].style.backgroundColor = 'white';
        }
    } else {
        if (row === slide) {
            if (col % 2 !== 0) {
                table.rows[row + 1].cells[col].style.backgroundColor = 'white';
                table.rows[row + 1].cells[col + 1].style.backgroundColor = 'white';
            } else {
                table.rows[row + 1].cells[col - 1].style.backgroundColor = 'white';
                table.rows[row + 1].cells[col].style.backgroundColor = 'white';
            }
        }
    }
}

function tableLeave(cell) {
    var loc = cell.id.split('-');
    var row = parseInt(loc[0]);
    var col = parseInt(loc[1]);
    if (col % 2 !== 0) {
        table.rows[row + 1].cells[col].style.backgroundColor = '#e1e1e1';
        table.rows[row + 1].cells[col + 1].style.backgroundColor = '#e1e1e1';
    } else {
        table.rows[row + 1].cells[col - 1].style.backgroundColor = '#e1e1e1';
        table.rows[row + 1].cells[col].style.backgroundColor = '#e1e1e1';
    }
}

function addRow(ind) {
    tabBody = document.getElementById("data").getElementsByTagName("tbody").item(0);
    row = document.createElement("tr");
    cell = document.createElement("td");
    if (flag) {
        cell.appendChild(document.createTextNode(headers[ind]));
        row.appendChild(cell);
        for (var c = 0; c < nSlides * 2; c++) {
            var cella = document.createElement("td");
            cella.id = "" + (ind + 1) + "-" + (c + 1);
            cella.appendChild(document.createTextNode(""));
            row.appendChild(cella);
        }
    } else {
        cell.appendChild(document.createTextNode(ind));
        row.appendChild(cell);
        for (var c = 0; c < headers.length * 2; c++) {
            var cella = document.createElement("td");
            cella.id = "" + ind + "-" + (c + 1);
            cella.appendChild(document.createTextNode(""));
            row.appendChild(cella);
        }
    }
    tabBody.appendChild(row);
}

function initTable() {
    var text = "";
    if (flag) {
        text = "<tr><th rowspan=\"2\">MARKER</th>";
        for (var i = 1; i <= nSlides; i++) {
            text += "<th colspan=\"2\">IMG" + i + "</th>";
        }
        text += "</tr>";
        for (var i = 1; i <= nSlides; i++) {
            text += "<th>X</th><th>Y</th>";
        }
    } else {
        text = "<tr><th rowspan=\"2\">IMG</th>";
        for (var i = 0; i < headers.length; i++) {
            text += "<th colspan=\"2\">" + headers[i] + "</th>";
        }
        text += "<tr>";
        for (var i = 0; i < headers.length; i++) {
            text += "<th>X</th><th>Y</th>";
        }
    }
    table.innerHTML = text;
    if (flag) {
        for (var i = 0; i < headers.length; i++) {
            addRow(i);
        }
    } else {
        for (var i = 1; i <= nSlides; i++) {
            addRow(i);
        }
    }
    setupTable();
    if (flag) {
        for (var i = 0; i < headers.length; i++) {
            table.rows[i + 2].cells[0].style.backgroundColor = "#ffffff";
        }
    } else {
        table.rows[slide + 1].cells[0].style.backgroundColor = "#ffffff";
    }
}

function changeImage() {
    var img = document.getElementById("img");
    if (flag) {
        if (single) {
            img.src = "./images/" + project + "/" + image + ".jpg";
        } else {
            img.src = "./images/" + project + "/" + image + slide + ".jpg";
        }
    } else {
        img.src = "./images/" + project + "/" + type + image + slide + ".jpg";
    }
    img.width = w;
    img.height = h;
}

function setMenSel() {
    var l = document.getElementsByClassName("mensel");
    for (var i = 0; i < l.length; i++) {
        l[i].className = "";
    }
    document.getElementById(sel).className = "mensel";
}

function setModSel() {
    var l = document.getElementsByClassName("modsel");
    for (var i = 0; i < l.length; i++) {
        l[i].className = "";
    }
    if (!flag) {
        document.getElementById(type).className = "modsel";
    }
}

function mode(t) {
    type = t;
    setMenSel();
    setModSel();
    load();
}

function menu(s) {
    sel = s;
    flag = false;
    single = false;
    switch (s) {
        case "start":
            flag = true;
            single = true;
            project = "more";
            image = "Sprinter";
            nSlides = 1;
            headers = ["LTOE", "RTOE", "LANK", "RANK", "LKNE", "RKNE", "LHIP",
                "RHIP", "LSHL", "RSHL", "LELB", "RELB", "LWRI", "RWRI", "EAR"];
            w = 290;
            h = 356;
            break;
        case "barbell":
            flag = true;
            single = true;
            project = "more";
            image = "OlympicLift";
            nSlides = 1;
            headers = ["REF", "HEEL", "TOE", "ANK", "KNE", "HIP", "SHL", "EAR",
                "BAR"];
            w = 169;
            h = 405;
            break;
        case "lift":
            flag = true;
            single = true;
            project = "more";
            image = "BoxLift";
            nSlides = 1;
            headers = ["TOE", "MFT", "HEEL", "ANK", "KNE", "HIP", "SHL", "WRI",
                "EAR", "BOX UL", "BOX BR"];
            w = 224;
            h = 315;
            break;
        case "sts":
            flag = true;
            project = "STS";
            image = "STS";
            nSlides = 3;
            headers = ["LREF", "REF", "TOE", "HEEL", "ANK", "KNE", "HIP", "SHL",
                "ELB", "WRI", "EAR"];
            w = 336;
            h = 472;
            break;
        case "balltoss":
            project = "BALL_TOSS";
            image = "BT";
            nSlides = (type === "T" ? 16 : 14);
            headers = ["REFBR", "REFTL", "EAR", "HIP", "KNE", "ANK", "TOE",
                "BALL", "WRI", "ELB", "SHL"];
            w = 500;
            h = 281;
            break;
        case "jardn":
            project = "JAR_DN";
            image = "LO";
            nSlides = (type === "T" ? 11 : 12);
            headers = ["REFBR", "REFTL", "EAR", "HIP", "KNE", "ANK", "TOE",
                "JAR", "WRI", "ELB", "SHL"];
            w = 500;
            h = 281;
            break;
        case "jarup":
            project = "JAR_UP";
            image = "RO";
            nSlides = (type === "T" ? 13 : 11);
            headers = ["REFBR", "REFTL", "EAR", "HIP", "KNE", "ANK", "TOE",
                "JAR", "WRI", "ELB", "SHL"];
            w = 500;
            h = 281;
            break;
        case "jumpout":
            project = "JUMP_OUT";
            image = "HJ";
            nSlides = 20;
            headers = ["REFBR", "REFTL", "TOE", "ANK", "KNE", "HIP", "SHL",
                "EAR"];
            w = 500;
            h = 281;
            break;
        case "jumpup":
            project = "JUMP_UP";
            image = "VJ";
            nSlides = (type === "T" ? 15 : 18);
            headers = ["REFBR", "REFTL", "TOE", "ANK", "KNE", "HIP", "SHL",
                "EAR"];
            w = 500;
            h = 281;
            break;
        case "obs":
            project = "OBSTACLE";
            image = "SB";
            nSlides = (type === "T" ? 12 : 13);
            headers = ["REFBR", "REFTL", "TOE", "ANK", "KNE", "HIP", "SHL",
                "EAR"];
            w = 500;
            h = 281;
            break;
    }
    setMenSel();
    setModSel();
    load();
}

function load() {
    slide = 1;
    changeImage();
    initTable();
}