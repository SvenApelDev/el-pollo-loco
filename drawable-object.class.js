class DrawableObject {
	img;
	x;
	y;
	height;
	width;

    /**
     * Loads a single image into this.img.
     * @param {string} path - path to the image file 
     */
	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

    /**
     * Draw this object's image onto the canvas.
     * @param {CanvasRenderingContext2D} ctx - the 2d rendering context
     */
	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}
