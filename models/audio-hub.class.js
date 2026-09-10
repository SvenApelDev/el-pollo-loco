class MyAudio {
	file;
	isLoaded;

	constructor(_file) {
		this.file = new Audio(_file);
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

    static collectSounds() {
        const groups = [AudioHub.PEPE, AudioHub.CHICKEN, AudioHub.ENDBOSS, AudioHub.COLLECT, AudioHub.BOTTLE, AudioHub.GAME];
        return groups.flatMap((group) => Object.values(group));
    }

    static playOne(sound) {
        if (AudioHub.muted) return;
        sound.file.currentTime = 0;
        sound.file.play();
    }

    static stopOne(sound) {
        sound.file.pause();
        sound.file.currentTime = 0;
    }

    static stopAll() {
        AudioHub.allSounds.forEach((sounds) => {
            sounds.file.pause();
            sounds.file.currentTime = 0;
        });
    }

    static toggleMute() {
        AudioHub.muted = !AudioHub.muted;
        localStorage.setItem("muted", JSON.stringify(AudioHub.muted));
        if (AudioHub.muted) AudioHub.stopAll();
    }

    static {
        AudioHub.allSounds.forEach((s) => (s.file.volume = 0.4));
        AudioHub.GAME.gamePlay.file.volume = 0.15;
        AudioHub.GAME.gamePlay.file.loop = true;
        AudioHub.GAME.end.file.loop = true;
        AudioHub.PEPE.walk.file.loop = true;
        AudioHub.PEPE.snore.file.loop = true;
    }
}
