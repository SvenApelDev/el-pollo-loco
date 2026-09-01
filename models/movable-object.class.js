
class MovableObject extends DrawableObject {
    speed = 0.15;

/**
 * Moves the object to the left based on its current speed.
 */  
    moveLeft() {
        this.x -= this.speed;
    }
}