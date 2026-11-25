class MyAudio {
	file;

	/**
	 * Wraps an audio file for use in the AudioHub.
	 * @param {string} path - Path to the audio file.
	 */
	constructor(path) {
		this.file = new Audio(path);
	}
}

class AudioHub {
	static PEPE = {
		walk: new MyAudio("sounds/character/characterRun.mp3"),
		jump: new MyAudio("sounds/character/characterJump.mp3"),
		hurt: new MyAudio("sounds/character/characterDamage.mp3"),
		snore: new MyAudio("sounds/character/characterSnoring.mp3"),
		dead: new MyAudio("sounds/character/characterDead.wav"),
	};

	static CHICKEN = {
		dead: new MyAudio("sounds/chicken/trampledSound.wav"),
	};

	static ENDBOSS = {
		attack: new MyAudio("sounds/endboss/endbossAttack.wav"),
		hurt: new MyAudio("sounds/endboss/endbossHurt.mp3"),
		dead: new MyAudio("sounds/endboss/endbossDead.mp3"),
	};

	static COLLECT = {
		coin: new MyAudio("sounds/collectibles/collectSound.wav"),
		bottle: new MyAudio("sounds/collectibles/bottleCollectSound.wav"),
	};

	static BOTTLE = {
		throw: new MyAudio("sounds/throwable/bottleThrowing.wav"),
		break: new MyAudio("sounds/throwable/bottleBreak.mp3"),
	};

	static GAME = {
		gamePlay: new MyAudio("sounds/game/playMusic.mp3"),
		start: new MyAudio("sounds/game/startSound.wav"),
		end: new MyAudio("sounds/game/endMusic.mp3"),
		win: new MyAudio("sounds/game/winMusic.mp3"),
		lose: new MyAudio("sounds/game/loseMusic.mp3"),
	};

	static muted = JSON.parse(localStorage.getItem("muted")) || false;
	static allSounds = AudioHub.collectSounds();

	/**
	 * Collects all sounds from every group into one flat list.
	 * @returns {MyAudio[]} All sounds of the game.
	 */
	static collectSounds() {
		const groups = [AudioHub.PEPE, AudioHub.CHICKEN, AudioHub.ENDBOSS, AudioHub.COLLECT, AudioHub.BOTTLE, AudioHub.GAME];
		return groups.flatMap((group) => Object.values(group));
	}

	/**
	 * Plays a sound from the start unless audio is muted.
	 * @param {MyAudio} sound - The sound to play.
	 */
	static playOne(sound) {
		if (AudioHub.muted) return;
		sound.file.currentTime = 0;
		sound.file.play().catch(() => {});
	}

	/**
	 * Stops a sound and rewinds it to the start.
	 * @param {MyAudio} sound - The sound to stop.
	 */
	static stopOne(sound) {
		sound.file.pause();
		sound.file.currentTime = 0;
	}

	/**
	 * Stops all sounds of the game.
	 */
	static stopAll() {
		AudioHub.allSounds.forEach((sound) => AudioHub.stopOne(sound));
	}

	/**
	 * Toggles the mute state, saves it and stops all sounds when muted.
	 */
	static toggleMute() {
		AudioHub.muted = !AudioHub.muted;
		localStorage.setItem("muted", JSON.stringify(AudioHub.muted));
		if (AudioHub.muted) AudioHub.stopAll();
	}

	/**
	 * Sets default volumes and loops once when the class loads.
	 */
	static {
		AudioHub.allSounds.forEach((sound) => (sound.file.volume = 0.4));
		AudioHub.GAME.gamePlay.file.volume = 0.15;
		AudioHub.GAME.gamePlay.file.loop = true;
		AudioHub.GAME.end.file.loop = true;
		AudioHub.PEPE.walk.file.loop = true;
		AudioHub.PEPE.snore.file.loop = true;
	}
}
