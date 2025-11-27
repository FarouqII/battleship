import loadImage from '../modules/assets'
import { ALPH, SHIP_LENGTHS } from './constants';
import { placeShipRequest } from './gameLogic';
import { putShip } from './util';

export function renderShip(params) {
    const shipImg = putShip(params);
    params.container.appendChild(shipImg);
}

export function renderFleet(gameboard, placmenets, lengths, container) {
    for (const shipName in placmenets) {
        const { x, y, axis } = placements[shipName];

        const tile = document.getElementById(`${x + 1} - ${ALPH[y]}`);
        const tileRect = tile.getBoundingClientRect;
        const containerRect = container.getBoundingClientRect;

        renderShip({
            gameboard,
            shipName,
            shipLength: SHIP_LENGTHS[shipName],
            axis,
            startingPoint: [x, y],
            tileRect,
            containerRect,
            container,
        })
    }
}

export function setupAxisButtons(axisButtons, onAxisChange) {
    axisButtons.forEach(button => {
        button.addEventListener("change", e => {
            e.preventDefault();
            axis = button.id.split('-')[1];
        })
    })
}

export function setupTileClicks(tiles, getSelected, getAxis, gameboard, container) {
    tiles.forEach(tile => {
        tile.addEventListener("click", e => {
            e.preventDefault();

            const shipName = getSelected();
            if (!shipName) return;

            const [col, rowLetter] = tile.id.split('-');
            const x = parseInt(col) - 1;
            const y = ALPH.indexOf(rowLetter);
            const axis = getAxis();

            const ok = placeShipRequest(gameboard, shipName, x, y, axis);
            if (!ok) return;

            const tileRect = tile.getBoundingClientRect;
            const containerRect = container.getBoundingClientRect;

            renderShip({
                gameboard,
                shipName,
                shipLength: SHIP_LENGTHS[shipName],
                axis,
                startingPoint: [x, y],
                tileRect,
                containerRect,
                container,
            });
        });
    });
}