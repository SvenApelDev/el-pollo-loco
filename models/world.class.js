class World {
	canvas;
	ctx;
	keyboard;
	level = level1;

	/**
	 * Initializes the canvas, input controllers, and starts the render loop.
	 * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
	 * @param {Keyboard} keyboard - The keyboard input controller.
	 */
	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.setWorld();
		this.draw();
	}

	/**
	 * Links game objects to the current world instance:
	 */
	setWorld() {
		// character.world = this
	}

	/**
	 * Clears the canvas and draws all game objects continuously.
	 */
	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.addObjectsToMap(this.level.backgroundObjects);
		requestAnimationFrame(() => this.draw());
	}

	/**
	 * Renders an array of game objects onto the canvas context.
	 * @param {DrawableObject[]} objects - Array of objects with a draw method.
	 */
	addObjectsToMap(objects) {
		objects.forEach((object) => {
			object.draw(this.ctx);
		});
	}
}
