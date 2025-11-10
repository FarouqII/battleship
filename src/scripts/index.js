import Gameboard from './classes/gameboard.js';
import Ship from './classes/ship.js';

const gb = new Gameboard();
gb.placeShip(new Ship('shadow'), [5, 5]);
console.log(gb.getBoard());
console.log(gb.getFleet());