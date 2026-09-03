class ThrowableObject extends MovableObject {
	height = 60;
	width = 50;
	offset = { top: 10, left: 10, right: 10, bottom: 10 };
	isSplashed = false;
    canBeRemoved = false;

	/**
	 * Creates a throwable bottle at the given position and throws it.
	 * @param {number} x - start x position
	 * @param {number} y - start y position
	 */
	constructor(x, y) {
		super();
		this.loadImage(ImageHub.BOTTLE.rotation[0]);
		this.loadImages(ImageHub.BOTTLE.rotation);
		this.x = x;
		this.y = y;
		this.throw();
	}

	/**
	 * Throws the bottle with movement and rotation animation.
	 */
	throw() {
		this.speedY = 15;
		this.applyGravity();
		IntervalHub.startInterval(() => {
			if (this.isSplashed) return;
			this.x += 8;
		}, 1000 / 60);
		IntervalHub.startInterval(() => {
			if (this.isSplashed) return;
			this.playAnimation(ImageHub.BOTTLE.rotation);
		}, 1000 / 25);
	}

	/**
	 * Applies gravity to the bootle until it hits the ground.
	 */
	applyGravity() {
		IntervalHub.startInterval(() => {
			if (this.y < 364) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			} else {
				this.splash();
			}
		}, 1000 / 25);
	}

	splash() {
		if (!this.isSplashed) {
			this.isSplashed = true;
			this.currentImage = 0;
			this.loadImages(ImageHub.BOTTLE.splash);
            setTimeout(() => this.canBeRemoved = true, 300);
		}
		this.playAnimationOnce(ImageHub.BOTTLE.splash);
	}
}
