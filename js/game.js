let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Prepares the canvas and binds the touch controls on page load.
 */
function init() {
	canvas = document.getElementById("canvas");
	bindTouchControls();
}

/**
 * Starts a new game and hides all screen overlays.
 */

function startGame() {
	document.getElementById("startScreen").classList.add("hidden");
	document.getElementById("gameOver").classList.add("hidden");
	document.getElementById("winScreen").classList.add("hidden");
	world = new World(canvas, keyboard);
}

/**
 * Returns to start screen after the game has ended.
 */

function backToStart() {
	document.getElementById("gameOver").classList.add("hidden");
	document.getElementById("winScreen").classList.add("hidden");
	document.getElementById("startScreen").classList.remove("hidden");
}

/**
 * Binds all on-screen touch buttons to keyboard flags.
 */
function bindTouchControls() {
	bindTouchButton("btnLeft", "LEFT");
	bindTouchButton("btnRight", "RIGHT");
	bindTouchButton("btnJump", "SPACE");
	bindTouchButton("btnThrow", "D");
}

/**
 * Binds one touch to press and release a keyboard flag.
 * @param {string} id - the button element id.
 * @param {*} key - the keyboard property to toggle.
 */
function bindTouchButton(id, key) {
	const button = document.getElementById(id);
	button.addEventListener("touchstart", (e) => {
		e.preventDefault();
		keyboard[key] = true;
	});
	button.addEventListener("touchend", (e) => {
		e.preventDefault();
		keyboard[key] = false;
	});
}

window.addEventListener("keydown", (event) => {
	let key = Keyboard.KEYS[event.keyCode];
	if (key) keyboard[key] = true;
});

window.addEventListener("keyup", (event) => {
	let key = Keyboard.KEYS[event.keyCode];
	if (key) keyboard[key] = false;
});
