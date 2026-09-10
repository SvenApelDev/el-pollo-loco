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
        start: new MyAudio("sounds/game/startSound.mp3"),
        end: new MyAudio("sounds/game/endMusic.mp3"),
        win: new MyAudio("sounds/game/winMusic.mp3"),
        lose: new MyAudio("sounds/game/loseMusic.mp3"),
    };

}
