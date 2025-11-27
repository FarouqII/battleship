// src/main/game.js
import Gameboard from "../classes/Gameboard.js";
import createGrid from "../modules/createGrid.js";

import { setupShipOptions, setupAxisButtons, setupTileClicks } from "../modules/domHandlers.js";
import { placeAllRandomShips } from "../modules/gameLogic.js";
import { renderFleet } from "../modules/render.js";
import { ENABLE_RANDOM } from "../modules/constants.js";

export function gameLoader() {
    // --- DOM elements ---
    const gameDiv = document.getElementById("game");
    const board = document.getElementById("setup-board");
    const imageContainer = document.getElementById("setup-image-container");

    const options = document.querySelectorAll(".setup-option");
    const axisButtons = document.querySelectorAll('input[name="axis"]');

    // --- Activate game UI ---
    gameDiv.style.display = "flex";

    // --- Gameboard model ---
    const gameboard = new Gameboard();

    // --- create tiles in board ---
    createGrid(board);
    const tiles = document.querySelectorAll(".setup-tile");

    // --- state ---
    let selected = "";
    let axis = "x";

    // --- setup ship option buttons ---
    setupShipOptions(options, shipName => {
        selected = shipName;
    });

    // --- setup axis selector ---
    setupAxisButtons(axisButtons, newAxis => {
        axis = newAxis;
    });

    // --- tile click handler (placing ships manually) ---
    setupTileClicks(
        tiles,
        () => selected,      // getter function
        () => axis,              // getter function
        gameboard,
        imageContainer
    );

    if (ENABLE_RANDOM) {
        // --- Random fleet placement ---
        const randomPlacement = placeAllRandomShips(gameboard);

        // --- Render the randomized fleet visually ---
        renderFleet(
            gameboard,
            randomPlacement,
            imageContainer
        );
    }

    if (gameboard.getFleet().length === 5) {
        console.log(gameboard.getBoard());
    }
}