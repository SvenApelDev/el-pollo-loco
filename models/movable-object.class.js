class MovableObject extends DrawableObject {
	energy = 100;
	lastHit = 0;
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
	 * @param {string[]} images - array of image paths to play
	 */
	playAnimation(images) {
		let i = this.currentImage % images.length;
		let path = images[i];
		this.img = this.imageCache[path];
		this.currentImage++;
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
	 * Makes the object jump by setting upward speed.
	 */
	jump() {
		this.speedY = 32;
	}

	/**
	 * Checks if this object overlaps another movable object.
	 * @param {MovableObject} mo - the other object
	 * @returns {boolean}
	 */
	isColliding(mo) {
		return this.x + this.width > mo.x && this.x < mo.x + mo.width && this.y + this.height > mo.y && this.y < mo.y + mo.height;
	}

	/**
	 * Reduces energy by 5 and records the time of the hit.
	 */
	hit() {
		this.energy -= 5;
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
}
