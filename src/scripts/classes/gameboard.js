import Ship from "./ship.js";

export default class Gameboard {
    constructor() {
        this.board = new Array(10).fill('x').map(() => new Array(10).fill('x'));
        this.fleet = [];
    }

    // GETTERS
    getBoard() { return this.board };
    getFleet() { return this.fleet };
    getShip(name) { return this.fleet.filter((ship) => ship.getName() === name) };

    // Fleet
    addShip(name) {
        name = name.toLowerCase();
        switch (name) {
            case "shadow":
                this.fleet.push(new Ship('shadow', 5));
                break;

            case "frigate":
                this.fleet.push(new Ship('frigate', 4));
                break;
            
            case "serpent":
                this.fleet.push(new Ship('serpent', 3));
                break;

            case "hawk":
                this.fleet.push(new Ship('hawk', 3));
                break;

            default:
                this.fleet.push(new Ship('runner', 2));
        }
    }

    emptyFleet() { this.fleet = [] };

    // Place
    placeShip(ship, start) {
        let shipLength = ship.getLength();
        const [x, y] = start;
        const placementMap = [];

        for (let i = y; i < this.board.length; i++) {
            if (this.board[x][y] !== 'x') return false;

            placementMap.push([x, i]);
            shipLength -= 1;
            if (shipLength === 0) break;
        }

        placementMap.forEach(coord => {
            const [i, j] = coord;
            this.board[i][j] = `${ship.getName()}`;
        })

        this.addShip(ship.getName());
        return true;
    }

    // Attacks
    receiveAttack(coords) {
        const [x, y] = coords;
        this.hit(x, y);
    }

    hit(x, y) {
        switch (this.board[x][y]) {
            case 'shadow':
                this.getShip('shadow')[0].hitShip();
                break;

            case 'frigate':
                this.getShip('frigate')[0].hitShip();
                break;

            case 'serpent':
                this.getShip('serpent')[0].hitShip();
                break;

            case 'hawk':
                this.getShip('hawk')[0].hitShip();
                break;
            
            case "runner":
                this.getShip('runner')[0].hitShip();
            
            default:
                this.board[x][y] = 'miss';
        }
    }

    isAllSunk() {
      const sunk = this.fleet.filter((ship) => ship.getSunk() === true)
      return sunk.length === 5
    }
}