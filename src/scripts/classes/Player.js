import Gameboard from "./Gameboard";

export default class Player {
    constructor(type, name) {
        this.type = type;
        this.name = name ? name : type;
        this.gb = new Gameboard();
    }

    //GETTERS
    getType() { return this.type };
    getName() { return this.name };
    getGameboard() { return this.gb };

    //SETTERS
    setName(newName) { this.name = newName };
}