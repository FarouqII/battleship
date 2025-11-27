export default class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.isSunk = false;
        this.hits = 0;
    }

    // GETTERS
    getName() { return this.name }
    getLength() { return this.length }
    getHits() { return this.hits }

    // State Modifiers
    hitShip() {
        this.hits += 1;
        if (this.hits === this.length) this.isSunk = true;
    }
}