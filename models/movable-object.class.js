
class MovableObject extends DrawableObject {
	speed = 0.15;
    currentImage = 0;
	/**
	 * Moves the object to the left based on its current speed.
	 */
	moveLeft() {
		this.x -= this.speed;
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
}
