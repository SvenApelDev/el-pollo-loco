class MyAudio {
    file;
    isLoaded;

    constructor(_file) {
        this.file = new Audio(_file);
    }
}

class AudioHub {
    static WALKING = new MyAudio("sounds/character/characterRun.mp3");
    static JUMPING = new MyAudio("sounds/character/characterJump.wav");
    static HURT = new MyAudio("sounds/character/characterDamage.mp3");
    static SNORING = new MyAudio("sounds/character/characterSnoring.mp3");
    static CHICKEN_DEAD = new MyAudio("sounds/character/characterDead.wav");
    static COIN = new MyAudio("sounds/collectibles/collectSound.wav");
    static BOTTLE = new MyAudio("sounds/collectibles/bottleCollectSound.wav");
    static THROW = new MyAudio("sounds/throwable/bottleBreak.mp3");
    static ENDBOSS_HURT = new MyAudio("sounds/endboss/endbossApproach.wav");
    static GAME_MUSIC = new MyAudio("sounds/game/gameStart.mp3");
    static WIN = new MyAudio("");
    static LOSE = new MyAudio("");
}