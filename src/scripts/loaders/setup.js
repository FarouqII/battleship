import Typed from 'typed.js';

import Gameboard from "../classes/Gameboard.js";
import createGrid from "../modules/createGrid.js";

import { setupShipOptions, setupAxisButtons, setupTileClicks } from "../modules/domHandlers.js";
import { placeAllRandomShips } from "../modules/gameLogic.js";
import { renderFleet } from "../modules/render.js";
import { ENABLE_RANDOM } from "../modules/constants.js";

export function setupLoader(name) {
    // --- DOM elements ---
    const displayDiv = document.getElementById('display');
    const board = document.getElementById("setup-board");
    const imageContainer = document.getElementById("setup-image-container");

    const options = document.querySelectorAll(".setup-option");
    const axisButtons = document.querySelectorAll('input[name="axis"]');

    // --- Activate game UI ---
    displayDiv.style.display = "flex";

    // --- Type in top bar ---
    const typed = new Typed('#topbar-text', {
        strings: [`Give us your plan, General <span class="name">${name}</span>!`],
        typeSpeed: 75,
        typeDelay: 500,
    });

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
    }, gameboard);

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
            imageContainer,
            board
        );
    }
}