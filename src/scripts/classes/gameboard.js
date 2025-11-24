import Ship from "./ship.js";

export default class Gameboard {
    constructor() {
        this.board = new Array(10).fill(null).map(() => new Array(10).fill('x'));
        this.fleet = [];
    }

    // GETTERS
    getBoard() { return this.board; }
    getFleet() { return this.fleet; }
    getShip(name) { return this.fleet.find(ship => ship.getName() === name); }

    // Fleet
    addShip(name, length) {
        // Prevent duplicates
        if (this.getShip(name)) return;

        this.fleet.push(new Ship(name, length));
    }

    // ---------------------------
    // PLACE SHIP
    // ---------------------------
    placeShip(ship, start, axis = "x") {
        let shipLength = ship.getLength();
        const [col, row] = start;
        const placementMap = [];

        for (let i = 0; i < shipLength; i++) {
            const x = axis === "x" ? col + i : col;
            const y = axis === "y" ? row + i : row;

            if (this.board[y][x] !== 'x') return false;

            placementMap.push([y, x]);
        }

        placementMap.forEach(([y, x]) => {
            this.board[y][x] = ship.getName();
        });

        this.addShip(ship.getName(), ship.getLength());
        return true;
    }

    // ---------------------------
    // ATTACKS
    // ---------------------------
    receiveAttack([x, y]) {
        this.hit(x, y);
    }

    hit(x, y) {
        const cell = this.board[x][y];

        switch (cell) {
            case 'shadow':
            case 'frigate':
            case 'serpent':
            case 'hawk':
            case 'starfighter': {
                const ship = this.getShip(cell);
                if (ship) ship.hitShip();
                this.board[x][y] = 'hit';
                break;
            }

            default:
                this.board[x][y] = 'miss';
        }
    }

    // ---------------------------
    // CHECK IF ALL SHIPS ARE SUNK
    // ---------------------------
    isAllSunk() {
        return this.fleet.every(ship => ship.getSunk());
    }
}
