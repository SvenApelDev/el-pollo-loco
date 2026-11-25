class Bottle extends MovableObject {
    height= 70;
    width = 60;
    offset = {top: 10, left: 15, right: 15, bottom: 10};

/**
 * Creates a collectable bottle at a random ground position.
 */
    constructor() {
        super();
        this.loadImage(ImageHub.BOTTLE.ground[0]);
        this.x = 300 + Math.random() * 3000;
        this.y = 350;
    }
}