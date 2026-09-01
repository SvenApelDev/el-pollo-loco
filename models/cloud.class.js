class Cloud extends MovableObject {
	y = 50;
	height = 250;
	width = 500;
	speed = 0.2;

	/**
	 * Creates a cloud at a given x position and starts its movement.
	 * @param {number} x - base x position
	 */
	constructor(x) {
		super();
		this.loadImage(
			ImageHub.CLOUDS[Math.floor(Math.random() * ImageHub.CLOUDS.length)],
		);
		this.x = x + Math.random() * 200;
		this.animate();
	}
    
	/**
	 * Moves the cloud left continuously.
	 */
	animate() {
		IntervalHub.startInterval(() => this.moveCloud(), 1000 / 60);
	}

	/**
	 * Moves the cloud left and resets it to the right when off-screen.
	 */
	moveCloud() {
		this.moveLeft();
		if (this.x + this.width < -720) {
			this.x = 1440 + Math.random() * 500;
		}
	}
}
