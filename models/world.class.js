class World {
	canvas;
	ctx;
	keyboard;

	constructor(canvas, keyboard) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.keyboard = keyboard;
		this.setWorld();
		this.draw();
	}

	setWorld() {
		// character.world = this
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(50, 50, 100, 100); //testweise - wird später entfernt!!!
		requestAnimationFrame(() => this.draw());
	}
}
