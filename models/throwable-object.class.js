class ThrowableObject extends MovableObject {
    height = 60;
    width = 50;
    offset = { top: 10, left: 10, right: 10, bottom: 10 };

    /**
     * Creates a throwable bottle at the given position and throws it.
     * @param {number} x - start x position
     * @param {number} y - start y position
     */
    constructor(x, y) {
        super();
        this.loadImage(ImageHub.BOTTLE.rotation[0]);
        this.loadImages(ImageHub.BOTTLE.rotation);
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        IntervalHub.startInterval(() => this.x += 8, 1000 / 60);
        IntervalHub.startInterval(() => this.playAnimation(ImageHub.BOTTLE.rotation), 1000 / 25);
    }

    /**
     * Applies gravity to the bootle so it falls all the way down.
     */
    applyGravity() {
        IntervalHub.startInterval(() => {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 25);
    }
}