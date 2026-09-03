class StatusBar extends DrawableObject {
	x = 20;
	y = 0;
	width = 200;
	height = 60;
	percentage = 100;

	/**
	 * Creates the health status bar and sets it to full.
	 */
	constructor() {
		super();
		this.loadImages(ImageHub.HEALTHBAR);
		this.setPercentage(100);
	}

	/**
	 * Updates the bar image based on the given percentage.
	 * @param {number} percentage - current energy from 0 to 100
	 */
	setPercentage(percentage) {
		this.percentage = percentage;
		const index = this.resolveImageIndex();
		this.img = this.imageCache[ImageHub.HEALTHBAR[index]];
	}

    /**
     * Returns the image index matching the current percentage.
     * @returns {number}
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}
