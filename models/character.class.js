class Character extends MovableObject {
	height = 280;
	width = 150;
	y = 150;
	x = 100;
	speed = 10;
	world;

	/**
	 * Creates the character, loads its images and places it in the world.
	 */
	constructor() {
		super();
		this.loadImage(ImageHub.PEPE.idle[0]);
		this.loadImages(ImageHub.PEPE.idle);
		this.loadImages(ImageHub.PEPE.walk);
		this.loadImages(ImageHub.PEPE.jump);
		this.loadImages(ImageHub.PEPE.hurt);
		this.loadImages(ImageHub.PEPE.dead);
		this.loadImages(ImageHub.PEPE.longIdle);
		this.animate();
	}

	/**
	 * Starts the character's idle animation loop.
	 */
	animate() {
        IntervalHub.startInterval(() => this.checkMovement(), 1000 / 60);
		IntervalHub.startInterval(
			() => this.playAnimation(ImageHub.PEPE.idle),
			1000 / 6,
		);
	}

    /**
     * Reads keyboard input and moves the character accordingly.
     */
    checkMovement() {
        if (this.world.keyboard.RIGHT) {
            this.moveRight();
        }
        if (this.world.keyboard.LEFT) {
            this.moveLeft();
        }
    }
}
