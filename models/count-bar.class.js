class CountBar extends DrawableObject {

    /**
     * Creates a counter bar with an icon and a number.
     * @param {string} imagePath - path to the icon image
     * @param {number} x - horizontal position
     * @param {number} y - vertical position
     */
    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.count = 0;
    }

    /**
     * Draws the icon and the current count next to it.
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(this.count, this.x + this.width + 5, this.y + 35);
    }
}