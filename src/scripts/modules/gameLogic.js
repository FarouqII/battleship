import Ship from "../classes/Ship";
import {SHIP_LENGTHS, SHIPS} from './constants.js';

export function canPlace(board, x, y, length, axis) {
    const size = board.length;

    if (axis === "x") {
        if (x + length > size) return false;
        if (y < 0 || y >= size) return false;

        for (let i = 0; i < length; i++) {
            if (board[y][x + i] !== "x") return false;
        }
    } else {
        if (y + length > size) return false;
        if (x < 0 || x >= size) return false;

        for (let i = 0; i < length; i++) {
            if (board[y + i][x] !== "x") return false;
        }
    }

    return true;
}

export function placeShipRequest(gameboard, shipName, x, y, axis) {
    const length = SHIP_LENGTHS[shipName];
    const board = gameboard.getBoard();

    // --- CHECK DUPLICATE ---
    if (gameboard.getFleet().some(s => s.name === shipName)) return false;

    // --- AXIS BOUNDS CHECK ---
    if (axis === "x" && x + length > 10) return false;
    if (axis === "y" && y + length > 10) return false;

    // --- CHECK OVERLAP ---
    if (!canPlace(board, x, y, length, axis)) return false;

    gameboard.placeShip(
        new Ship(shipName, length, axis),
        [x, y],
        axis
    );

    return true;
}

export function placeRandomShip(gameboard, shipName) {
    while (true) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const axis = Math.random() > 0.5 ? "x" : "y";

        if (placeShipRequest(gameboard, shipName, x, y, axis)) {
            return { x, y, axis };
        }
    }
}

export function placeAllRandomShips(gameboard) {
    const placements = {};

    for (const ship of SHIPS) {
        const result = placeRandomShip(gameboard, ship);
        placements[ship] = result;
    }

    return placements;
}