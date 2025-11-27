import { putShip } from '../modules/util.js';
import { ALPH, SHIP_LENGTHS } from "./constants.js";

const lengths = SHIP_LENGTHS;
const alph = ALPH;

export function renderShip(params) {
    const shipImg = putShip(params);
    params.container.appendChild(shipImg);
}

export function renderFleet(gameboard, placements, container) {
    for (const shipName in placements) {
        const { x, y, axis } = placements[shipName];

        const tile = document.getElementById(`${x + 1}-${alph[y]}`);
        const tileRect = tile.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        renderShip({
            gameboard,
            shipName,
            shipLength: lengths[shipName],
            axis,
            startingPoint: [x, y],
            tileRect,
            containerRect,
            container,
        });
    }
}