class World {
	canvas;
	ctx;
	keyboard;
	level = LevelBuilder.create();
	camera_x = 0;
	character = new Character();
	statusBar = new StatusBar(ImageHub.HEALTHBAR, 20, 0);
	endbossBar = new StatusBar(ImageHub.HEALTHBAR_ENDBOSS.orange, 480, 0);
	endboss = this.level.enemies.find((e) => e instanceof Endboss);
	bottleAmount = 0;
	bottleBar = new CountBar(ImageHub.BOTTLE.single, 20, 60, 50, 50, 90);
	coinAmount = 0;
	coinBar = new CountBar(ImageHub.COIN[1], 110, 50, 75, 75, 90);
	throwableObjects = [];
	throwCooldown = false;
	collectLocked = false;

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
		this.addObjectsToMap(this.level.bottles);
		this.addObjectsToMap(this.level.coins);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addToMap(this.character);
		this.ctx.translate(-this.camera_x, 0);
		this.addToMap(this.statusBar);
		this.bottleBar.count = this.bottleAmount;
		this.bottleBar.draw(this.ctx);
		this.coinBar.count = this.coinAmount;
		this.coinBar.draw(this.ctx);
		this.endbossBar.draw(this.ctx);
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
		IntervalHub.startInterval(() => this.checkBottleHits(), 1000 / 60);
		IntervalHub.startInterval(() => this.clearBottles(), 1000 / 10);
		IntervalHub.startInterval(() => this.clearDeadEnemies(), 1000 / 10);
		IntervalHub.startInterval(() => this.checkEndboss(), 1000 / 60);
		IntervalHub.startInterval(() => this.checkGameOver(), 1000 / 60);
		IntervalHub.startInterval(() => this.checkWin(), 1000 / 60);
	}

	/**
	 * Runs all character collision checks in priority order.
	 * Stops after the first successful action per tick.
	 */
	checkCollision() {
		this.character.getRealFrame();
		if (this.checkEnemyHit()) return;
		if (this.checkEnemyKill()) return;
		if (this.collectLocked) {
			if (!this.character.isAboveGround()) this.collectLocked = false;
			return;
		}
		if (this.collectBottle()) return;
		this.collectCoin();
	}

	/**
	 * Applies damage if the character collides with an enemy from the side.
	 * @returns {boolean} True if the character got hit.
	 */
	checkEnemyHit() {
		for (const enemy of this.level.enemies) {
			enemy.getRealFrame();
			if (this.character.isColliding(enemy) && !enemy.isDeadEnemy && !this.character.isFalling() && !this.character.isHurt()) {
				this.character.hit();
				this.statusBar.setPercentage(this.character.energy);
				return true;
			}
		}
		return false;
	}

	/**
	 * Kills one enemy if the character lands on it from above.
	 * @returns {boolean} True if an enemy was killed.
	 */
	checkEnemyKill() {
		for (const enemy of this.level.enemies) {
			enemy.getRealFrame();
			if (this.character.isColliding(enemy) && !enemy.isDeadEnemy && this.character.isFalling() && !(enemy instanceof Endboss)) {
				enemy.die();
				this.character.jump();
				this.collectLocked = true;
				return true;
			}
		}
		return false;
	}

	/**
	 * Collects one bottle on collision and updates the count.
	 * @returns {boolean} True if a bottle was collected.
	 */
	collectBottle() {
		for (let i = 0; i < this.level.bottles.length; i++) {
			const bottle = this.level.bottles[i];
			bottle.getRealFrame();
			if (this.character.isColliding(bottle)) {
				this.level.bottles.splice(i, 1);
				this.bottleAmount++;
				return true;
			}
		}
		return false;
	}

	/**
	 * Collects one coin on collision and updates the total.
	 * @returns {boolean} True if a coin was collected.
	 */
	collectCoin() {
		for (let i = 0; i < this.level.coins.length; i++) {
			const coin = this.level.coins[i];
			coin.getRealFrame();
			if (this.character.isColliding(coin)) {
				this.level.coins.splice(i, 1);
				this.coinAmount++;
				return true;
			}
		}
		return false;
	}

	/**
	 * Throws one bottle per Key press of D.
	 */
	checkThrow() {
		if (this.keyboard.D && !this.throwCooldown && this.bottleAmount > 0) {
			const bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
			this.throwableObjects.push(bottle);
			this.bottleAmount--;
			this.throwCooldown = true;
		}
		if (!this.keyboard.D) {
			this.throwCooldown = false;
		}
	}

	/**
	 * Checks collisions between thrown bottles and enemies.
	 */
	checkBottleHits() {
		this.throwableObjects.forEach((bottle) => {
			bottle.getRealFrame();
			this.level.enemies.forEach((enemy) => {
				enemy.getRealFrame();
				if (bottle.isColliding(enemy) && !enemy.isDeadEnemy && !bottle.isSplashed) {
					if (enemy instanceof Endboss) {
						enemy.hit();
						this.endbossBar.setPercentage(enemy.energy);
					} else {
						enemy.die();
					}
					bottle.splash();
				}
			});
		});
	}

	/**
	 * Remove bottles whose splash animation has finished.
	 */
	clearBottles() {
		this.throwableObjects = this.throwableObjects.filter((bottle) => !bottle.canBeRemoved);
	}

	/**
	 * Removes enemies whose death animation has been shown for 1.5s.
	 */
	clearDeadEnemies() {
		this.level.enemies = this.level.enemies.filter((enemy) => !enemy.diedAt || Date.now() - enemy.diedAt < 1500);
	}

	/**
	 * Activates the endboss and moves it toward the character.
	 * @returns
	 */
	checkEndboss() {
		if (!this.endboss || this.endboss.isDead()) return;
		if (this.character.x > this.endboss.x - 500) {
			this.endboss.hadFirstContact = true;
		}
		if (this.endboss.hadFirstContact) {
			this.endboss.isAttacking = this.character.x > this.endboss.x - 150;
			this.endboss.moveLeft();
		}
	}

	/**
	 * Shows the game over screen once the character's death animation finished.
	 */
	checkGameOver() {
		if (this.character.deadFinished && !(this.endboss && this.endboss.isDead())) {
			IntervalHub.stopAllIntervals();
			document.getElementById("gameOver").classList.remove("hidden");
		}
	}

	/**
	 * Shows the win screen once the endboss is dead.
	 */
	checkWin() {
		if (this.endboss && this.endboss.isDead()) {
			IntervalHub.stopAllIntervals();
			document.getElementById("winScreen").classList.remove("hidden");
		}
	}
}
