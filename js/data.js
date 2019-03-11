// DATASET TYPES
var TYPE_START = 0;
var TYPE_BARBELL = 1;
var TYPE_LIFT = 2;
var TYPE_STS = 3;
var TYPE_BALL_TOSS = 4;
var TYPE_JAR_DN = 5;
var TYPE_JAR_UP = 6;
var TYPE_JUMP_OUT = 7;
var TYPE_JUMP_UP = 8;
var TYPE_OBSTACLE = 9;

// SUBJECT TYPES
var TYPE_TALL = 0;
var TYPE_SHORT = 1;

var datasets;

function initData() {
    datasets = [
        new DataSetNoSub("Sprint Start",
            ["LTOE", "RTOE", "LANK", "RANK", "LKNE", "RKNE", "LHIP", "RHIP", "LSHL", "RSHL", "LELB", "RELB", "LWRI", "RWRI", "EAR"],
            1, "more", "Sprinter", 290, 356
        ),
        new DataSetNoSub("Barbell Lift",
            ["REF", "HEEL", "TOE", "ANK", "KNE", "HIP", "SHL", "EAR", "BAR"],
            1, "more", "OlympicLift", 169, 405
        ),
        new DataSetNoSub("Box Lift",
            ["TOE", "MFT", "HEEL", "ANK", "KNE", "HIP", "SHL", "WRI", "EAR", "BOX UL", "BOX BR"],
            1, "more", "BoxLift", 224, 315
        ),
        new DataSetNoSub("Sit to Stand",
            ["LREF", "REF", "TOE", "HEEL", "ANK", "KNE", "HIP", "SHL", "ELB", "WRI", "EAR"],
            3, "STS", "STS", 336, 472
        ),
        new DataSet("Ball Toss",
            ["REFBR", "REFTL", "EAR", "HIP", "KNE", "ANK", "TOE", "BALL", "WRI", "ELB", "SHL"],
            [16, 14], "BALL_TOSS", "BT", 500, 281
        ),
        new DataSet("Jar Down",
            ["REFBR", "REFTL", "EAR", "HIP", "KNE", "ANK", "TOE", "JAR", "WRI", "ELB", "SHL"],
            [11, 12], "JAR_DN", "LO", 500, 281
        ),
        new DataSet("Jar Up",
            ["REFBR", "REFTL", "EAR", "HIP", "KNE", "ANK", "TOE", "JAR", "WRI", "ELB", "SHL"],
            [13, 11], "JAR_UP", "RO", 500, 281
        ),
        new DataSet("Jump Out",
            ["REFBR", "REFTL", "TOE", "ANK", "KNE", "HIP", "SHL", "EAR"],
            [20, 20], "JUMP_OUT", "HJ", 500, 281
        ),
        new DataSet("Jump Up",
            ["REFBR", "REFTL", "TOE", "ANK", "KNE", "HIP", "SHL", "EAR"],
            [15, 18], "JUMP_UP", "VJ", 500, 281
        ),
        new DataSet("Obstacle",
            ["REFBR", "REFTL", "TOE", "ANK", "KNE", "HIP", "SHL", "EAR"],
            [12, 13], "OBSTACLE", "SB", 500, 281
        )
    ];
}

function DataSet(name, headers, numImages, imgDir, img, w, h) {
    this.name = name;
    this.headers = headers;
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

function DataSetNoSub(name, headers, numImages, imgDir, img, w, h) {
    this.name = name;
    this.headers = headers;
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
    if (value == TYPE_SHORT){
        return "S";
    }
    return "";
}
