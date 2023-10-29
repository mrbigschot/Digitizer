class Digitizer {
    constructor() {
        this.guidedMode = true;
        this.dataset = null;
        this.subCategory = SUBCAT_NONE;
        this.imageIndex = 1;
        this.datapointIndex = 0;
        this.clickPosition = {
            x: null,
            y: null
        };
    }

    toggleGuidedMode() { this.guidedMode = !this.guidedMode; }
    
    setDataset(ds, subcat = SUBCAT_NONE) {
        this.dataset = ds;
        this.subCategory = subcat;
        this.setClickPosition(null, null);
        this.imageIndex = 1;
        this.datapointIndex = 0;
    }
    setSubCategory(cat) {
        this.subCategory = cat;
        this.setClickPosition(null, null);
        this.imageIndex = 1;
        this.datapointIndex = 0;
    }
    setClickPosition(x, y) {
        this.clickPosition.x = x;
        this.clickPosition.y = y;
    }
    hasClickPosition() { return this.clickPosition.x && this.clickPosition.y; }
    
    nextImage() {
        if (this.imageIndex < this.dataset.getNumberOfImages(this.subCategory)) {
            this.imageIndex++;
        } else {
            this.imageIndex = 1;
        }
        this.setClickPosition(null, null);
    }
    previousImage() {
        if (this.imageIndex > 1) {
            this.imageIndex--;
        } else {
            this.imageIndex = this.dataset.getNumberOfImages(this.subCategory);
        }
        this.setClickPosition(null, null);
    }

    processClickPosition(x, y) {
        this.setClickPosition(x, y);
        if (this.guidedMode) {
            populateTableCellsAtDataPoint(this.imageIndex - 1, this.datapointIndex);
            this.nextDataPoint();
        }
    }
    nextDataPoint() {
        highlightCellsAtDataPoint(this.imageIndex - 1, this.datapointIndex, false);
        if (this.datapointIndex < this.dataset.datapoints.length - 1) {
            this.datapointIndex++;
        } else {
            this.nextImage();
            updateImage();
            this.datapointIndex = 0;
        }
        highlightCellsAtDataPoint(this.imageIndex - 1, this.datapointIndex, true);
    }
    getPrompt() {
        if (this.guidedMode) {
            return "Click on the " + this.dataset.datapoints[this.datapointIndex][1].toUpperCase();
        } else {
            return "Click on a datapoint in the frame, then click on a table cell to store the coordinates";
        }
    }

}