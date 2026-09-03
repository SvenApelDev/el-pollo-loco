class World {
	canvas;
	ctx;
	keyboard;
	level = level1;
	camera_x = 0;
	character = new Character();
	statusBar = new StatusBar();
	throwableObjects = [];
    throwCooldown = false;

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
		this.run();
		this.draw();
	}

	/**
	 * Links game objects to the current world instance:
	 */
	setWorld() {
		this.character.world = this;
	}

	/**
	 * Clears the canvas and draws all game objects continuously.
	 */
	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.camera_x = -this.character.x + 100;

		this.ctx.translate(this.camera_x, 0);
		this.addObjectsToMap(this.level.backgroundObjects);
		this.addObjectsToMap(this.level.clouds);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addToMap(this.character);
		this.character.drawFrame(this.ctx);
		this.level.enemies.forEach((e) => e.drawFrame(this.ctx));
		this.ctx.translate(-this.camera_x, 0);
		this.addToMap(this.statusBar);
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

	/**
	 * Draws a single object, mirrored if it faces the other direction.
	 * @param {DrawableObject} object - the object to draw
	 */
	addToMap(object) {
		if (object.otherDirection) {
			this.flipImage(object);
		}
		object.draw(this.ctx);
		if (object.otherDirection) {
			this.flipImageBack(object);
		}
	}

	/**
	 * Flip the canvas horizontally for mirrored drawing.
	 * @param {DrawableObject} object
	 */
	flipImage(object) {
		this.ctx.save();
		this.ctx.translate(object.width, 0);
		this.ctx.scale(-1, 1);
		object.x = object.x * -1;
	}

	/**
	 * Restores the canvas after mirrored drawing.
	 * @param {DrawableObject} object
	 */
	flipImageBack(object) {
		object.x = object.x * -1;
		this.ctx.restore();
	}

	/**
	 * Starts the collision check loop.
	 */
	run() {
		IntervalHub.startInterval(() => this.checkCollision(), 1000 / 60);
		IntervalHub.startInterval(() => this.checkThrow(), 1000 / 60);
	}

	/**
	 * Checks collisions between character and enemies.
	 */
	checkCollision() {
		this.character.getRealFrame();
		this.level.enemies.forEach((enemy) => {
			enemy.getRealFrame();
			if (this.character.isColliding(enemy) && !enemy.isDeadEnemy) {
				if (this.character.isFalling()) {
					enemy.die();
					this.character.jump();
				} else if (!this.character.isHurt()) {
					this.character.hit();
					this.statusBar.setPercentage(this.character.energy);
				}
			}
		});
	}

	/**
	 * Throws one bottle per Key press of D.
	 */
	checkThrow() {
		if (this.keyboard.D && !this.throwCooldown) {
			const bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
			this.throwableObjects.push(bottle);
            this.throwCooldown = true;
		}
        if (!this.keyboard.D) {
            this.throwCooldown = false;
        }
	}
}
