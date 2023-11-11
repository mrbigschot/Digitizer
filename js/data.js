// DATASET TYPES
const TYPE_START = 0;
const TYPE_BARBELL = 1;
const TYPE_LIFT = 2;
const TYPE_GLUTE_EX = 3;
const TYPE_STS = 4;
const TYPE_BALL_TOSS = 5;
const TYPE_JAR_DN = 6;
const TYPE_JAR_UP = 7;
const TYPE_JAR_COG = 8;
const TYPE_JUMP_OUT = 9;
const TYPE_JUMP_UP = 10;
const TYPE_OBSTACLE = 11;

// SUBJECT TYPES
const SUBCAT_MAXI = 0;
const SUBCAT_MINI = 1;
const SUBCAT_NONE = 2;

class DigitizerData {
    constructor() {
        this.datasets = [
            new DatasetNoSub("Sprint Start",
                [["LTOE", "Left Toe"],
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
                ["EAR", "Ear"]],
                1, "more", "Sprinter", 290, 356
            ),
            new DatasetNoSub("Barbell Lift",
                [["REF", "Reference"],
                ["HEEL", "Heel"],
                ["TOE", "Toe"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"],
                ["BAR", "Bar"]],
                1, "more", "OlympicLift", 169, 405
            ),
            new DatasetNoSub("Box Lift",
                [["TOE", "Toe"],
                ["MFT", "Midfoot"],
                ["HEEL", "Heel"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["WRI", "Wrist"],
                ["EAR", "Ear"],
                ["BOX UL", "Box (upper left)"], 
                ["BOX BR", "Box (bottom right)"]],
                1, "more", "BoxLift", 224, 315
            ),
            new DatasetNoSub("Glute Exercise",
                [["LTOE", "Left Toe"],
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
                ["EAR", "Ear"]],
                1, "more", "GluteEx", 352, 235
            ),
            new DatasetNoSub("Gymnast",
                [["KNU", "Knuckle"],
                ["WRI", "Wrist"],
                ["ELB", "Elbow"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"],
                ["HIP", "Hip"],
                ["KNE", "Knee"],
                ["ANK", "Ankle"],
                ["TOE", "Toe"]],
                1, "more", "Gymnast", 327, 512
            ),
            new DatasetNoSub("Diver",
                [["WRI", "Wrist"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"],
                ["HIP", "Hip"],
                ["KNE", "Knee"],
                ["ANK", "Ankle"],
                ["TOE", "Toe"]],
                1, "more", "Diver", 444, 336
            ),
            new DatasetNoSub("Sit to Stand",
                [["REFL", "Reference (left)"],
                ["REFR", "Reference (right)"],
                ["TOE", "Toe"],
                ["HEEL", "Heel"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["ELB", "Elbow"],
                ["WRI", "Wrist"],
                ["EAR", "Ear"]],
                3, "STS", "STS", 336, 472
            ),
            new Dataset("Ball Toss",
                [["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["EAR", "Ear"],
                ["HIP", "Hip"],
                ["KNE", "Knee"],
                ["ANK", "Ankle"],
                ["TOE", "Toe"],
                ["BALL", "Ball"],
                ["WRI", "Wrist"],
                ["ELB", "Elbow"],
                ["SHL", "Shoulder"]],
                [16, 14], "BALL_TOSS", "BT", 500, 281
            ),
            new Dataset("Jar Down",
                [["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["EAR", "Ear"],
                ["HIP", "Hip"],
                ["KNE", "Knee"],
                ["ANK", "Ankle"],
                ["TOE", "Toe"],
                ["JAR", "Jar"],
                ["WRI", "Wrist"],
                ["ELB", "Elbow"],
                ["SHL", "Shoulder"]],
                [11, 12], "JAR_DN", "LO", 500, 281
            ),
            new Dataset("Jar Up",
                [["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["EAR", "Ear"],
                ["HIP", "Hip"],
                ["KNE", "Knee"],
                ["ANK", "Ankle"],
                ["TOE", "Toe"],
                ["JAR", "Jar"],
                ["WRI", "Wrist"],
                ["ELB", "Elbow"],
                ["SHL", "Shoulder"]],
                [13, 11], "JAR_UP", "RO", 500, 281
            ),
            new Dataset("Jar C.o.G.",
                [["TOE", "Toe"],
                ["HEEL", "Heel"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["LELB*", "Left Elbow (white and blue marker at mid-torso)"],
                ["RELB", "Right Elbow"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"],
                ["WRI", "Wrist"],
                ["JAR", "Jar"]],
                [1, 1], "JAR_COG", "JCOG", 240, 395
            ),
            new Dataset("Jump Out",
                [["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["TOE", "Toe"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"]],
                [20, 20], "JUMP_OUT", "HJ", 500, 281
            ),
            new Dataset("Jump Up",
                [["REFBR", "Reference (bottom right)"],
                ["REFTL", "Reference (top left)"],
                ["TOE", "Toe"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"]],
                [15, 18], "JUMP_UP", "VJ", 500, 281
            ),
            new Dataset("Obstacle",
                [["REFBL", "Reference (bottom left)"],
                ["TOE", "Toe"],
                ["ANK", "Ankle"],
                ["KNE", "Knee"],
                ["HIP", "Hip"],
                ["SHL", "Shoulder"],
                ["EAR", "Ear"]],
                [15, 15], "OBSTACLE", "SB", 500, 281
            )
        ];
    }

    getDataset(datasetId) { return this.datasets[datasetId]; } 

    getSubCategoryPrefix(value) {
        switch (value) {
            case SUBCAT_MAXI:
                return "T";
            case SUBCAT_MINI:
                return "S";
            case SUBCAT_NONE:
                return "";
            default:
                return null;
        }
    }

    table2CSV(table, dataset) {
        let csvData = [];

        // header data
        let tmpRow = [];
        tmpRow[tmpRow.length] = "Frame";
        for (let h = 0; h < dataset.datapoints.length; h++) {
            tmpRow[tmpRow.length] = dataset.datapoints[h][0] + " X";
            tmpRow[tmpRow.length] = dataset.datapoints[h][0] + " Y";
        }
        row2CSV(tmpRow);

        // actual data
        let tableBody = table.getElementsByTagName("tbody")[0];
        let tableRows = tableBody.getElementsByTagName("tr");
        for (let r = 0; r < tableRows.length; r++) {
            let tableRow = tableRows[r];
            let tmpRow = [];
            let cells = tableRow.getElementsByTagName("td");
            for (let c = 0; c < cells.length; c++) {
                tmpRow[tmpRow.length] = formatData(cells[c]);
            }
            row2CSV(tmpRow);
        }

        let mydata = csvData.join('\n');
        let filename = dataset.image + getSubCategory(currentSubCategory) + ".csv";
        download(mydata, filename);

        function row2CSV(tmpRow) {
            let tmp = tmpRow.join('') // to remove any blank rows
            if (tmpRow.length > 0 && tmp) {
                let mystr = tmpRow.join(',');
                csvData[csvData.length] = mystr;
            }
        }

        function formatData(cell) {
            let output = cell.innerText;
            if (!output) return '';
            return output.trim();
        }

        function download(data, filename) {
            let blob = new Blob([data], {type: "text/csv"});
            let a = document.createElement('a');
            a.setAttribute("href", window.URL.createObjectURL(blob));
            a.setAttribute("download", filename);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
}

class Dataset {
    constructor(name, datapoints, numImages, imgDir, img, w, h) {
        this.name = name;
        this.datapoints = datapoints;
        this.numImages = numImages;
        this.imageDir = imgDir
        this.image = img
        this.imgWidth = w;
        this.imgHeight = h;
        this.hasSub = true;
    }
    getNumberOfImages(sub) { return this.numImages[sub]; }
}

class DatasetNoSub {
    constructor(name, datapoints, numImages, imgDir, img, w, h) {
        this.name = name;
        this.datapoints = datapoints;
        this.numImages = numImages;
        this.imageDir = imgDir
        this.image = img
        this.imgWidth = w;
        this.imgHeight = h;
        this.hasSub = false;
    }
    getNumberOfImages() { return this.numImages; }
}