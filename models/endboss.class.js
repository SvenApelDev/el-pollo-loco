class Endboss extends MovableObject {
	height = 400;
	width = 250;
	y = 60;
    speed = 0.5;
	energy = 100;
	offset = { top: 70, left: 50, right: 60, bottom: 40 };
	hadFirstContact = false;
	showAlert = false;

	/**
	 * Creates the endboss at the end of the level.
	 */
	constructor() {
		super();
		this.loadImage(ImageHub.ENDBOSS.alert[0]);
		this.loadImages(ImageHub.ENDBOSS.alert);
		this.loadImages(ImageHub.ENDBOSS.walk);
		this.loadImages(ImageHub.ENDBOSS.attack);
		this.loadImages(ImageHub.ENDBOSS.hurt);
		this.loadImages(ImageHub.ENDBOSS.dead);
		this.x = 3500;
		this.animate();
	}

	/**
	 * Runs the endboss animation and alert toggle loops.
	 */
	animate() {
		IntervalHub.startInterval(() => this.checkAnimation(), 1000 / 6);
		IntervalHub.startInterval(() => this.toggleAlert(), 1500);
	}

	/**
	 * Toggle between walk and alert display during the case.
	 */
	toggleAlert() {
		if (this.hadFirstContact) this.showAlert = !this.showAlert;
	}

	/**
	 * Chooses the animation based on the endboss state.
	 */
	checkAnimation() {
		if (this.isDead()) {
			this.playDeadEndboss();
		} else if (this.isHurt()) {
			this.playAnimation(ImageHub.ENDBOSS.hurt);
		} else if (this.isAttacking) {
			this.playAnimation(ImageHub.ENDBOSS.attack);
		} else if (this.hadFirstContact) {
			this.playChase();
		} else {
			this.playAnimation(ImageHub.ENDBOSS.alert);
		}
	}

	/**
	 * Plays walk or alert while chasing the character.
	 */
	playChase() {
		if (this.showAlert) {
			this.playAnimation(ImageHub.ENDBOSS.alert);
		} else {
			this.playAnimation(ImageHub.ENDBOSS.walk);
		}
	}

	/**
	 * Plays the endboss death animation once, with sound and end delay.
	 */
	playDeadEndboss() {
		if (!this.deadStarted) {
			this.deadStarted = true;
			this.currentImage = 0;
			AudioHub.playOne(AudioHub.ENDBOSS.dead);
		}
		this.playAnimationOnce(ImageHub.ENDBOSS.dead);
		if (this.currentImage >= ImageHub.ENDBOSS.dead.length) {
			this.deadDelay++;
			if (this.deadDelay >= 6) this.deadFinished = true;
		}
	}
}
