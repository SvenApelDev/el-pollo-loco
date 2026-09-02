class Character extends MovableObject {
	height = 280;
	width = 150;
	y = 150;
	x = 100;
	speed = 5;
	otherDirection = false;
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
	 * Starts the character's movement and animation loops.
	 */
	animate() {
		IntervalHub.startInterval(() => this.checkMovement(), 1000 / 60);
		IntervalHub.startInterval(() => this.checkAnimation(), 1000 / 6);
	}

	/**
	 * Reads keyboard input and moves the character accordingly.
	 */
	checkMovement() {
		if (this.world.keyboard.RIGHT) {
			this.moveRight();
			this.otherDirection = false;
		}
		if (this.world.keyboard.LEFT) {
			this.moveLeft();
			this.otherDirection = true;
		}
	}

	/**
	 * Plays the animation that matches the character's current state.
	 */
	checkAnimation() {
		if (this.isMoving()) {
			this.playAnimation(ImageHub.PEPE.walk);
		} else {
			this.playAnimation(ImageHub.PEPE.idle);
		}
	}

	/**
	 * Return true if a movement key is pressed.
	 * @returns {boolean}
	 */
	isMoving() {
		return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
	}
}
