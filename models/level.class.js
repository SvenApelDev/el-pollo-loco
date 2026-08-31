
class Level {
    enemies;
    clouds;
    backgroundObjects;

    /**
     * Bundles all objects that belong to one level.
     * @param {MovableObject[]} enemies - all enemy objects
     * @param {MovableObject[]} clouds - all cloud objects
     * @param {MovableObject[]} backgroundObjects - all background segments 
     */
    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}