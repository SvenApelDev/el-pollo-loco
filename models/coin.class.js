class Coin extends MovableObject {
    height = 100;
    width = 100;
    offset = {top: 30, left: 30, right: 30, bottom: 30};

    /**
     * Creates an animation coin at a random position.
     */
    constructor() {
        super();
        this.loadImage(ImageHub.COIN[0]);
        this.loadImages(ImageHub.COIN);
        this.x = 300 + Math.random() * 3000;
        this.y = 100 + Math.random() * 150;
        this.animate();
    }

    /**
     * Starts the coin's glittering animation loop.
     */
    animate() {
        IntervalHub.startInterval(() => this.playAnimation(ImageHub.COIN), 1000 / 4);
    }
}