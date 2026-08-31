class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a background segment at a given horizontal position.
     * @param {string} imagePath - path to the background image
     * @param {number} x - horizontal position on the level
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}