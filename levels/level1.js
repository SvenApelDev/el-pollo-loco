class LevelBuilder {
	/**
	 * Builds a fresh level instance for new game.
	 * @returns {Level} a new level with all objects reset.
	 */
	static create() {
		return new Level(LevelBuilder.createEnemies(), LevelBuilder.createClouds(), LevelBuilder.createBackgrounds(), LevelBuilder.createBottles(), LevelBuilder.createCoins());
	}

	/**
	 * Creates the background layers for the level.
	 * @returns {BackgroundObject[]} fresh background objects.
	 */
	static createBackgrounds() {
		const backgrounds = [];
		let i = 0;
		for (let x = -720; x <= 3600; x += 720) {
			const n = i % 2 === 0 ? "1" : "2";
			backgrounds.push(new BackgroundObject("img/5_background/layers/air.png", x));
			backgrounds.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${n}.png`, x));
			backgrounds.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${n}.png`, x));
			backgrounds.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${n}.png`, x));
			i++;
		}
		return backgrounds;
	}

	/**
	 * Creates the clouds for the level.
	 * @returns {Cloud[]} fresh cloud objects.
	 */
	static createClouds() {
		const clouds = [];
		for (let x = -300; x <= 3600; x += 500) {
			clouds.push(new Cloud(x));
		}
		return clouds;
	}

	/**
	 * Creates the enemies including the endboss.
	 * @returns {MovableObject[]} fresh enemy objects.
	 */
	static createEnemies() {
		const enemies = [];
		for (let i = 0; i < 8; i++) {
			const baseX = 600 + i * 350;
			enemies.push(new ChickenNormal(baseX + Math.random() * 150));
			enemies.push(new ChickenSmall(baseX + 175 + Math.random() * 150));
		}
		enemies.push(new Endboss());
		return enemies;
	}

	/**
	 * Creates the collectable bottles.
	 * @returns {Bottle[]} fresh bottle objects.
	 */
	static createBottles() {
		const bottles = [];
		for (let i = 0; i < 12; i++) {
			bottles.push(new Bottle());
		}
		return bottles;
	}

	/**
	 * Creates the collectable coins.
	 * @returns {Coin[]} fresh coin objects.
	 */
	static createCoins() {
		const coins = [];
		for (let i = 0; i < 8; i++) {
			coins.push(new Coin());
		}
		return coins;
	}
}
