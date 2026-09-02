class MovableObject extends DrawableObject {
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
}
