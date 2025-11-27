import { placeShipRequest } from "./gameLogic.js";
import { renderShip } from "./render.js";
import loadImage from "./assets.js";
import { ALPH, SHIP_LENGTHS } from "./constants.js";

const lengths = SHIP_LENGTHS;
const alph = ALPH;

export function setupShipOptions(options, onSelect) {
    options.forEach(option => {
        option.addEventListener("click", e => {
            e.preventDefault();
            options.forEach(o => o.classList.remove("selected"));
            option.classList.add("selected");
            onSelect(option.id);
        });

        const img = option.querySelector(".option-image");
        if (img) img.src = loadImage(option.id);
    });
}

export function setupAxisButtons(axisButtons, onAxisChange) {
    axisButtons.forEach(btn => {
        btn.addEventListener("change", () => {
            onAxisChange(btn.id.split("-")[1]);
        });
    });
}

export function setupTileClicks(tiles, getSelected, getAxis, gameboard, container) {
    tiles.forEach(tile => {
        tile.addEventListener("click", e => {
            e.preventDefault();

            const shipName = getSelected();
            if (!shipName) return;

            const [col, rowLetter] = tile.id.split('-');
            const x = +col - 1;
            const y = alph.indexOf(rowLetter);
            const axis = getAxis();

            const ok = placeShipRequest(gameboard, shipName, x, y, axis);
            if (!ok) return;

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
                container
            });
        });
    });
}
