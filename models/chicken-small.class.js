class ChickenSmall extends MovableObject {
	height = 50;
	width = 50;
	y = 370;
    offset = {top: 5, left: 5, right: 5, bottom: 5};

	/**
	 * Creates a small chicken at a random position and starts its behaviour.
	 */
	constructor() {
		super();
		this.loadImage(ImageHub.CHICKEN_SMALL.walk[0]);
		this.loadImages(ImageHub.CHICKEN_SMALL.walk);
		this.loadImages(ImageHub.CHICKEN_SMALL.dead);
		this.x = 500 + Math.random() * 3000;
		this.speed = 0.2 + Math.random() * 0.6;
		this.animate();
	}

    /**
     * Starts the small chicken's movement and animation loops.
     */
    animate() {
        IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);
        IntervalHub.startInterval(() => this.playAnimation(ImageHub.CHICKEN_SMALL.walk), 1000 / 10);
    }
}
