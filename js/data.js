// DATASET TYPES
var TYPE_START = 0;
var TYPE_BARBELL = 1;
var TYPE_LIFT = 2;
var TYPE_GLUTE_EX = 3;
var TYPE_STS = 4;
var TYPE_BALL_TOSS = 5;
var TYPE_JAR_DN = 6;
var TYPE_JAR_UP = 7;
var TYPE_JAR_COG = 8;
var TYPE_JUMP_OUT = 9;
var TYPE_JUMP_UP = 10;
var TYPE_OBSTACLE = 11;

// SUBJECT TYPES
var TYPE_TALL = 0;
var TYPE_SHORT = 1;

var datasets;

function initData() {
    datasets = [
        new DataSetNoSub("Sprint Start",
            [
                ["LTOE", "Left Toe"],
                ["RTOE", "Right Toe"],
                ["LANK", "Left Ankle"],
                ["RANK", "Right Ankle"],
                ["LKNE", "Left Knee"],
                ["RKNE", "Right Knee"],
                ["LHIP", "Left Hip"],
                ["RHIP", "Right Hip"],
                ["LSHL", "Left Shoulder"],
                ["RSHL", "Right Shoulder"],
                ["LELB", "Left Elbow"],
                ["RELB", "Right Elbow"],
                ["LWRI", "Left Wrist"],
                ["RWRI", "Right Wrist"],
                ["EAR", "Ear"]
            ],
            1, "more", "Sprinter", 290, 356
        ),
        new DataSetNoSub("Barbell Lift",
            [
                ["REF", "Reference"],
                ["HEEL", "Heel"],
                ["TOE", "Toe"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"],
                ["BAR", "Bar"]
            ],
            1, "more", "OlympicLift", 169, 405
        ),
        new DataSetNoSub("Box Lift",
            [
                ["TOE", "Toe"],
                ["MFT", "Midfoot"],
                ["HEEL", "Heel"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["WRI", "Wrist"],
                ["EAR", "Ear"],
                ["BOX UL", "Box (upper left)"], 
                ["BOX BR", "Box (bottom right)"]
            ],
            1, "more", "BoxLift", 224, 315
        ),
        new DataSetNoSub("Glute Exercise",
            [
                ["LTOE", "Left Toe"],
                ["LANK", "Left Ankle"],
                ["LWGT", "Left Weight"],
                ["LKNE", "Right Weight"],
                ["RTOE", "Right Toe"],
                ["RANK", "Right Ankle"],
                ["RWGT", "Right Weight"],
                ["RKNE", "Right Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shouler"],
                ["ELB", "Elbow"],
                ["WRI", "Wrist"],
                ["EAR", "Ear"]
            ],
            1, "more", "GluteEx", 352, 235
        ),
        new DataSetNoSub("Sit to Stand",
            [
                ["REFL", "Reference (left)"],
                ["REFR", "Reference (right)"],
                ["TOE", "Toe"],
                ["HEEL", "Heel"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["ELB", "Elbow"],
                ["WRI", "Wrist"],
                ["EAR", "Ear"]
            ],
            3, "STS", "STS", 336, 472
        ),
        new DataSet("Ball Toss",
            [
                ["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["EAR", "Ear"],
                ["HIP", "Hip"],
                ["KNE", "Knee"],
                ["ANK", "Ankle"],
                ["TOE", "Toe"],
                ["BALL", "Ball"],
                ["WRI", "Wrist"],
                ["ELB", "Elbow"],
                ["SHL", "Shoulder"]
            ],
            [16, 14], "BALL_TOSS", "BT", 500, 281
        ),
        new DataSet("Jar Down",
            [
                ["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["EAR", "Ear"],
                ["HIP", "Hip"],
                ["KNE", "Knee"],
                ["ANK", "Ankle"],
                ["TOE", "Toe"],
                ["JAR", "Jar"],
                ["WRI", "Wrist"],
                ["ELB", "Elbow"],
                ["SHL", "Shoulder"]
            ],
            [11, 12], "JAR_DN", "LO", 500, 281
        ),
        new DataSet("Jar Up",
            [
                ["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["EAR", "Ear"],
                ["HIP", "Hip"],
                ["KNE", "Knee"],
                ["ANK", "Ankle"],
                ["TOE", "Toe"],
                ["JAR", "Jar"],
                ["WRI", "Wrist"],
                ["ELB", "Elbow"],
                ["SHL", "Shoulder"]
            ],
            [13, 11], "JAR_UP", "RO", 500, 281
        ),
        new DataSet("Jar C.o.G.",
            [
                ["TOE", "Toe"],
                ["HEEL", "Heel"],
                ["ANK", "Toe"],
                ["KNE", "Ankle"],
                ["HIP", "Knee"],
                ["LELB*", "Left Elbow (white and blue marker at mid-torso)"],
                ["RELB", "Right Elbow"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"],
                ["WRI", "Wrist"],
                ["JAR", "Jar"]
            ],
            [1, 1], "JAR_COG", "JCOG", 240, 395
        ),
        new DataSet("Jump Out",
            [
                ["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["TOE", "Toe"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"]
            ],
            [20, 20], "JUMP_OUT", "HJ", 500, 281
        ),
        new DataSet("Jump Up",
            [
                ["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["TOE", "Toe"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"]
            ],
            [15, 18], "JUMP_UP", "VJ", 500, 281
        ),
        new DataSet("Obstacle",
            [
                ["REFBL", "Reference (bottom left)"],
                ["TOE", "Toe"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"]
            ],
            [15, 15], "OBSTACLE", "SB", 500, 281
        )
    ];
}

function DataSet(name, datapoints, numImages, imgDir, img, w, h) {
    this.name = name;
    this.datapoints = datapoints;
    this.numImages = numImages;
    this.imageDir = imgDir
    this.image = img
    this.imgWidth = w;
    this.imgHeight = h;

    this.getNumberOfImages = function(sub) {
        return this.numImages[sub];
    };
    this.hasSub = true;
}

function DataSetNoSub(name, datapoints, numImages, imgDir, img, w, h) {
    this.name = name;
    this.datapoints = datapoints;
    this.numImages = numImages;
    this.imageDir = imgDir
    this.image = img
    this.imgWidth = w;
    this.imgHeight = h;

    this.getNumberOfImages = function() {
        return this.numImages;
    };
    this.hasSub = false;
}

function getDataSet(datasetID) {
    return datasets[datasetID];
}

function getSubCategory(value) {
    if (value == TYPE_TALL) {
        return "T";
    }
    if (value == TYPE_SHORT) {
        return "S";
    }
    return "";
}

function table2CSV(table, dataset) {
    var csvData = [];

    // header data
    var tmpRow = [];
    tmpRow[tmpRow.length] = "Frame";
    for (var h = 0; h < dataset.datapoints.length; h++) {
        tmpRow[tmpRow.length] = dataset.datapoints[h][0] + " X";
        tmpRow[tmpRow.length] = dataset.datapoints[h][0] + " Y";
    }
    row2CSV(tmpRow);

    // actual data
    var tableBody = table.getElementsByTagName("tbody")[0];
    var tableRows = tableBody.getElementsByTagName("tr");
    for (var r = 0; r < tableRows.length; r++) {
        var tableRow = tableRows[r];
        var tmpRow = [];
        var cells = tableRow.getElementsByTagName("td");
        for (var c = 0; c < cells.length; c++) {
            tmpRow[tmpRow.length] = formatData(cells[c]);
        }
        row2CSV(tmpRow);
    }

    var mydata = csvData.join('\n');
    var filename = dataset.image + getSubCategory(currentSubCategory) + ".csv";
    download(mydata, filename);

    function row2CSV(tmpRow) {
        var tmp = tmpRow.join('') // to remove any blank rows
        if (tmpRow.length > 0 && tmp) {
            var mystr = tmpRow.join(',');
            csvData[csvData.length] = mystr;
        }
    }

    function formatData(cell) {
        var output = cell.innerText;
        if (!output) return '';
        return output.trim();
    }

    function popup(data) {
        var generator = window.open('', 'csv', 'height=400,width=600');
        generator.document.write('<html><head><title>CSV</title>');
        generator.document.write('</head><body >');
        generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
        generator.document.write(data);
        generator.document.write('</textArea>');
        generator.document.write('</body></html>');
        generator.document.close();
        return true;
    }

    function download(data, filename) {
        var blob = new Blob([data], {type: "text/csv"});
        var a = document.createElement('a');
        a.setAttribute("href", window.URL.createObjectURL(blob));
        a.setAttribute("download", filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
