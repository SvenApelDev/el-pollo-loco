

let canvas;
let world;
let keyboard = new Keyboard();
let currentMusic = AudioHub.GAME.end;

/**
 * Prepares the canvas and binds the touch controls on page load.
 */
function init() {
	canvas = document.getElementById("canvas");
	bindTouchControls();
	updateMuteButton();
	initInstructions();
}

/**
 * Starts a new game and hides all screen overlays.
 */

function startGame() {
	document.getElementById("startScreen").classList.add("hidden");
	document.getElementById("gameOver").classList.add("hidden");
	document.getElementById("winScreen").classList.add("hidden");
	world = new World(canvas, keyboard);
	startGameMusicAfterIntro();
}

/**
 * Plays a sound once, then starts the given follow-up music.
 * @param {MyAudio} sound - The sound to play first.
 * @param {MyAudio} nextMusic - the music to start after it ends.
 */
function playThen(sound, nextMusic) {
	AudioHub.stopAll();
	currentMusic = nextMusic;
	AudioHub.playOne(sound);
	sound.file.addEventListener("ended", () => AudioHub.playOne(nextMusic), {once: true});
}


/**
 * Starts the gameplay music once the intro sound has finished.
 */
function startGameMusicAfterIntro() {
	playThen(AudioHub.GAME.start, AudioHub.GAME.gamePlay);
}

/**
 * Plays the lose jingle, then returns to the idle end music.
 */
function playGameOverMusic() {
	playThen(AudioHub.GAME.lose, AudioHub.GAME.end);
}

/**
 * Plays the win jingle, then returns to the idle end music.
 */
function playWinMusic() {
	playThen(AudioHub.GAME.win, AudioHub.GAME.end);
}


/**
 * Toggles all game audio and updates the button icon.
 */
function toggleMute() {
	AudioHub.toggleMute();
	updateMuteButton();
	if (!AudioHub.muted) {
		AudioHub.playOne(currentMusic);
	}
}

/**
 * Updates the mute button icon to match the current mute state.
 */
function updateMuteButton() {
	const btn = document.getElementById("muteBtn");
	btn.textContent = AudioHub.muted ? "🔇" : "🔊";
}


/**
 * Returns to start screen after the game has ended.
 */

function backToStart() {
	AudioHub.stopAll();
	currentMusic = AudioHub.GAME.end;
	AudioHub.playOne(AudioHub.GAME.end);
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
	if (key) {
		if (key === "SPACE") event.preventDefault();
		keyboard[key] = true;
	}
});

window.addEventListener("keyup", (event) => {
	let key = Keyboard.KEYS[event.keyCode];
	if (key) keyboard[key] = false;
});

/**
 * Opens the instructions dialog.
 */
function openInstructions() {
	document.getElementById('instructions').showModal();
}

/**
 * Close the instructions dialog.
 */
function closeInstructions() {
	document.getElementById('instructions').close();
}

/**
 * Binds the backdrop click of the instructions dialog to close it.
 */
function initInstructions() {
	const dialog = document.getElementById('instructions');
	dialog.addEventListener('click', (e) => {
		if (e.target === dialog) closeInstructions();
	});
}
