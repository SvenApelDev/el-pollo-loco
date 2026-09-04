class Endboss extends MovableObject {
	height = 400;
	width = 250;
	y = 60;
    energy = 100;
	offset = { top: 70, left: 50, right: 60, bottom: 40 };
    hadFirstContact = false;

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
     * Runs the endboss animation loop.
     */
    animate() {
        IntervalHub.startInterval(() => this.checkAnimation(), 1000 / 6);
    }

    /**
     * Chooses the animation based on the endboss state.
     */
    checkAnimation() {
        if (this.isDead()) {
            this.playDeadEndboss();
        } else if (this.isHurt()) {
            this.playAnimation(ImageHub.ENDBOSS.hurt);
        }else if (this.isAttacking) {
            this.playAnimation(ImageHub.ENDBOSS.attack);
        } else if (this.hadFirstContact) {
            this.playAnimation(ImageHub.ENDBOSS.walk);
        } else {
            this.playAnimation(ImageHub.ENDBOSS.alert);
        } 
    }

    playDeadEndboss() {
        if (!this.deadStarted) {
            this.deadStarted = true;
            this.currentImage = 0;
        }
        this.playAnimationOnce(ImageHub.ENDBOSS.dead);
    }
}
