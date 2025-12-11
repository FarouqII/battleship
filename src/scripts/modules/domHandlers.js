import { placeAllRandomShips, placeShipRequest } from "./gameLogic.js";
import { renderFleet, renderShip } from "./render.js";
import loadImage from "./assets.js";
import { ALPH, SHIP_LENGTHS } from "./constants.js";
import gameLoader from "../loaders/game.js";
import { resetBoard } from "./util.js";

const lengths = SHIP_LENGTHS;
const alph = ALPH;

export function setupShipOptions(options, onSelect, playerGameboard) {
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
    
    document.getElementById("done-btn").addEventListener("click", e => {
        e.preventDefault();
        gameLoader(playerGameboard);
    })
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

            if (gameboard.getFleet().some(s => s.name === getSelected())) document.querySelector(`#${getSelected()} .option-name h3`).style.color = "#bc938c";
        });
    });
}

export function enableStartButton() {
    const btn = document.getElementById("done-btn");
    btn.style.color = "var(--text)";
    btn.style.pointerEvents = "auto";
}

export function setupRandomizer(randomizer, gameboard, imageContainer, board) {
    randomizer.addEventListener('click', e => {
        e.preventDefault();

        resetBoard(gameboard, false);

        // --- Random fleet placement ---
        const randomPlacement = placeAllRandomShips(gameboard);

        // --- Render the randomized fleet visually ---
        renderFleet(
            gameboard,
            randomPlacement,
            imageContainer,
            board
        );
    })
}

export function setupReset(reset, gameboard) {
    reset.addEventListener("click", e => {
        e.preventDefault();

        resetBoard(gameboard, true);
    })
}