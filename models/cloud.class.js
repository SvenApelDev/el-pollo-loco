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
		this.loadImage('img/5_background/layers/4_clouds/1.png');
		this.x = x + Math.random() * 200;
		this.animate();
	}
	/**
	 * Moves the cloud left continuously.
	 */
	animate() {
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 60);
	}
}
