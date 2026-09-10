class Character extends MovableObject {
	height = 280;
	width = 150;
	y = 150;
	x = 100;
	speed = 5;
	minX = 100;
	maxX = 3400;
	otherDirection = false;
	lastMovement = 0;
    offset = {top: 140, left: 34, right: 46, bottom: 16};
    deadStarted = false;
	world;
	isWalking = false;
	isSnoring = false;
	isHurting = false;

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
		IntervalHub.startInterval(() => this.updateAnimationAndSound(), 1000 / 6);
	}

	/**
	 * Updates animation and state sounds on the same tick.
	 */
	updateAnimationAndSound() {
		this.checkAnimation();
		this.updateStateSounds();
	}

/**
 * Plays the animation that matches the character's current state.
 */
	checkAnimation() {
		if(this.isDead()) return this.playDeadAnimation();
		this.playAnimation(this.currentAnimation());
	}

	/**
	 * Returns the image set for the character's current non-dead state.
	 * @returns {string[]} The animation frames to play.
	 */
	currentAnimation() {
		if(this.isHurt()) return ImageHub.PEPE.hurt;
		if (this.isAboveGround()) return ImageHub.PEPE.jump;
		if(this.isMoving()) return ImageHub.PEPE.walk;
		if(this.isSleeping()) return ImageHub.PEPE.longIdle;
		return ImageHub.PEPE.idle;
	}

	/**
	 * Handles the looping snore sound and the one-shot hurt sound.
	 */
	updateStateSounds() {
		this.updateSnoreSound();
		this.updateHurtSound();
	}

	/**
	 * Loops the snore sound while sleeping, stops it otherwise.
	 */
	updateSnoreSound() {
		if(this.isSleeping() && !this.isSnoring) {
			AudioHub.playOne(AudioHub.PEPE.snore);
			this.isSnoring = true;
		} else if (!this.isSleeping()) {
			AudioHub.stopOne(AudioHub.PEPE.snore);
			this.isSnoring = false;
		}
	}

	/**
	 * Plays the hurt sound once per hurt phase.
	 */
	updateHurtSound() {
		if(this.isHurt() && !this.isHurting) {
			AudioHub.playOne(AudioHub.PEPE.hurt);
			this.isHurting = true;
		} else if (!this.isHurt()) {
			this.isHurting = false;
		}
	}

	/**
	 * Reads keyboard input and moves the character accordingly.
	 */
	checkMovement() {
		this.updateLastMovement();
		this.handleWalk();
		this.handleJump();
	}

	/**
	 * Refreshes the last-movement timestamp on any input.
	 */
	updateLastMovement() {
		if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE) {
			this.lastMovement = Date.now();
		}
	}

	/**
	 * Moves the character left or right based on input.
	 */
	handleWalk() {
		if(this.world.keyboard.RIGHT && this.x < this.maxX) {
			this.moveRight();
			this.otherDirection = false;
		}
		if (this.world.keyboard.LEFT && this.x > this.minX) {
			this.moveLeft();
			this.otherDirection = true;
		}
		this.updateWalkSound();
	}

	/**
	 * Starts the walk sound while moving on the ground, stops it otherwise.
	 */
	updateWalkSound() {
		const walking = this.isMoving() && !this.isAboveGround();
		if(walking && !this.isWalking) {
			AudioHub.playOne(AudioHub.PEPE.walk);
			this.isWalking = true;
		} else if(!walking) {
			AudioHub.stopOne(AudioHub.PEPE.walk);
			this.isWalking = false;
		}
	}

	/**
	 * Makes the character jump and plays the jump sound.
	 */
	handleJump() {
		if (this.world.keyboard.SPACE && !this.isAboveGround()) {
			this.jump();
			AudioHub.playOne(AudioHub.PEPE.jump);
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
