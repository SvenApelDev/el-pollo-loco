class Character extends MovableObject {
	height = 280;
	width = 150;
	y = 150;
	x = 100;
	speed = 5;
	otherDirection = false;
	lastMovement = 0;
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
		this.lastMovement = Date.now();
		this.applyGravity();
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
		if (
			this.world.keyboard.RIGHT ||
			this.world.keyboard.LEFT ||
			this.world.keyboard.SPACE
		) {
			this.lastMovement = Date.now();
		}
		if (this.world.keyboard.RIGHT) {
			this.moveRight();
			this.otherDirection = false;
		}
		if (this.world.keyboard.LEFT) {
			this.moveLeft();
			this.otherDirection = true;
		}
		if (this.world.keyboard.SPACE && !this.isAboveGround()) {
			this.jump();
		}
	}

	/**
	 * Plays the animation that matches the character's current state.
	 */
	checkAnimation() {
		if (this.isAboveGround()) {
			this.playAnimation(ImageHub.PEPE.jump);
		} else if (this.isMoving()) {
			this.playAnimation(ImageHub.PEPE.walk);
		} else if (this.isSleeping()) {
			this.playAnimation(ImageHub.PEPE.longIdle);
		} else {
			this.playAnimation(ImageHub.PEPE.idle);
		}
	}

	/**
	 * Return true if idle for more than 15 sec.
	 * @returns {boolean}
	 */
	isSleeping() {
		return Date.now() - this.lastMovement > 15000;
	}

	/**
	 * Return true if a movement key is pressed.
	 * @returns {boolean}
	 */
	isMoving() {
		return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
	}
}
