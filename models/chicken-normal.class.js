class ChickenNormal extends MovableObject {
    height = 60;
    width = 60;
    y = 360;
    offset = {top: 5, left: 3, right: 3, bottom: 5};

    /**
     * Creates a normal chicken at a random position and starts its behaviour.
     */
    constructor() {
        super();
        this.loadImage(ImageHub.CHICKEN_NORMAL.walk[0]);
        this.loadImages(ImageHub.CHICKEN_NORMAL.walk);
        this.loadImages(ImageHub.CHICKEN_NORMAL.dead);
        this.x = 500 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Starts the normal chicken's movement and animation loops.
     */
    animate() {
        IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);
        IntervalHub.startInterval(() => this.playAnimation(ImageHub.CHICKEN_NORMAL.walk), 1000 / 8);
    }
}