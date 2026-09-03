class MovableObject extends DrawableObject {
	energy = 100;
	lastHit = 0;
	isDeadEnemy = false;
	speed = 0.15;
	speedY = 0;
	currentImage = 0;
	acceleration = 2.5;

	/**
	 * Moves the object to the left based on its current speed.
	 */
	moveLeft() {
		this.x -= this.speed;
	}

	/**
	 * Moves the object to the right based on its current speed.
	 */
	moveRight() {
		this.x += this.speed;
	}

	/**
	 * Cycles through an animation array by updating this.img each call.
	 * @param {string[]} images - array of image paths to play.
	 */
	playAnimation(images) {
		let i = this.currentImage % images.length;
		let path = images[i];
		this.img = this.imageCache[path];
		this.currentImage++;
	}

	/**
	 * Plays an animation once and stops on last frame.
	 * @param {string[]} images - The image paths to play.
	 */
	playAnimationOnce(images) {
		if (this.currentImage < images.length) {
			this.img = this.imageCache[images[this.currentImage]];
			this.currentImage++;
		}
	}

	/**
	 * Plays the dead animation once, resetting the frame counter first.
	 */
	playDeadAnimation() {
		if (!this.deadStarted) {
			this.deadStarted = true;
			this.currentImage = 0;
		}
		this.playAnimationOnce(ImageHub.PEPE.dead);
	}

	/**
	 * Applies gravity by updating vertical position and speed over time.
	 */
	applyGravity() {
		IntervalHub.startInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			} else {
				this.y = 150;
				this.speedY = 0;
			}
		}, 1000 / 25);
	}

	/**
	 * Returns true if the object is above the ground.
	 * @returns {boolean}
	 */
	isAboveGround() {
		return this.y < 150;
	}

	/**
	 * Checks if this object real frame overlaps another's.
	 * @param {MovableObject} mo - the other object.
	 * @returns {boolean}
	 */
	isColliding(mo) {
		return this.rX + this.rW > mo.rX && this.rX < mo.rX + mo.rW && this.rY + this.rH > mo.rY && this.rY < mo.rY + mo.rH;
	}

	/**
	 * Makes the object jump by setting upward speed.
	 */
	jump() {
		this.speedY = 32;
	}

	/**
	 * Returns true if the object is currently falling.
	 * @returns {boolean}
	 */
	isFalling() {
		return this.speedY < 0;
	}

	/**
	 * Reduces energy by 5 and records the time of the hit.
	 */
	hit() {
		this.energy -= 10;
		if (this.energy < 0) {
			this.energy = 0;
		} else {
			this.lastHit = Date.now();
		}
	}

	/**
	 * Returns true if hit within the last second
	 * @returns {boolean}
	 */
	isHurt() {
		return Date.now() - this.lastHit < 1000;
	}

	/**
	 * Checks if the character has no energy left.
	 * @returns {boolean} True if energy is 0, otherwise false.
	 */
	isDead() {
		return this.energy == 0;
	}

	/**
	 * Marks the object as dead, shows its dead image and stops it.
	 */
	die() {
		this.isDeadEnemy = true;
		this.img = this.imageCache[this.deadImages[0]];
		this.speed = 0;
	}

	drawFrame(ctx) {
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "red";
		ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
		ctx.stroke();
	}

	/**
	 * Calculates the real collision frame from the offset.
	 */
	getRealFrame() {
		this.rX = this.x + this.offset.left;
		this.rY = this.y + this.offset.top;
		this.rW = this.width - this.offset.left - this.offset.right;
		this.rH = this.height - this.offset.top - this.offset.bottom;
	}
}
