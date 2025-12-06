import { putShip } from '../modules/util.js';
import { ALPH, SHIP_LENGTHS } from "./constants.js";
import { enableStartButton } from './domHandlers.js';

const lengths = SHIP_LENGTHS;
const alph = ALPH;

export function renderShip(params) {
    const shipImg = putShip(params);
    params.container.appendChild(shipImg);

    

    if (params.gameboard.getFleet().length === 5) {
        enableStartButton();
    }
}

export function renderFleet(gameboard, placements, container, board) {
    for (const shipName in placements) {
        const { x, y, axis } = placements[shipName];

        const id = `${x + 1}-${alph[y]}`;
        const tile = board.querySelector(`#${CSS.escape(id)}`);

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

export function renderAttack(tile, result) {
    if (result === "hit") {
        tile.classList.add("hit");
    } else if (result === "miss") {
        tile.classList.add("miss");
    }
}