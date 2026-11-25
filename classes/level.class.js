
class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;

    /**
     * Bundles all objects that belong to one level.
     * @param {MovableObject[]} enemies - all enemy objects
     * @param {MovableObject[]} clouds - all cloud objects
     * @param {MovableObject[]} backgroundObjects - all background segments
     * @param {MovableObject[]} bottles - all collectable bottles
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}