import Ship from "../classes/Ship.js";
import loadImage from "./assets.js";
import createGrid from "./createGrid.js";
import { setupTileClicks } from "./domHandlers.js";

export function putShip({
    gameboard,
    shipName,
    shipLength,
    axis,
    startingPoint,
    tileRect,
    containerRect
}) {

    // --- PLACE IN INTERNAL BOARD ---
    gameboard.placeShip(
        new Ship(shipName, shipLength, axis),
        startingPoint,
        axis
    );

    // --- POSITION IN DOM ---
    const x = tileRect.left - containerRect.left;
    const y = tileRect.top - containerRect.top;

    const tileWidth = tileRect.width;
    const tileHeight = tileRect.height;

    const shipImg = document.createElement("img");
    shipImg.src = loadImage(shipName);
    shipImg.classList.add("ship");
    shipImg.style.position = "absolute";
    shipImg.style.left = `${x}px`;
    shipImg.style.top = `${y}px`;

    // --- SIZE / ORIENTATION ---
    if (axis === "x") {
        shipImg.style.width = tileWidth * shipLength + "px";
        shipImg.style.height = tileHeight + "px";
        shipImg.style.transform = "none";
    } else {
        shipImg.style.width = tileWidth * shipLength + "px";
        shipImg.style.height = tileHeight + "px";

        shipImg.style.transformOrigin = "top left";
        shipImg.style.transform = "rotate(90deg) translateY(-100%)";
    }

    return shipImg;
}

export function createBoard(parentDiv, boardName) {

    const wrapper = document.createElement("div");
    wrapper.classList.add("board-wrapper");
    wrapper.id = `${boardName}-wrapper`;

    const newBoard = document.createElement("div");
    newBoard.id = `${boardName}-board`;
    newBoard.classList.add("board");

    const newImageContainer = document.createElement("div");
    newImageContainer.id = `${boardName}-image-container`;
    newImageContainer.classList.add("image-container");

    wrapper.appendChild(newBoard);
    wrapper.appendChild(newImageContainer);
    parentDiv.appendChild(wrapper);
}


export function canPlaceShip(board, startX, startY, length, axis) {
    if (axis === "x") {
        for (let i = 0; i < length; i++) {
            if (board[startY][startX + i] !== "x") return false;
        }
        return true
    }
    if (axis === "y") {
        for (let i = 0; i < length; i++) {
            if (board[startY + i][startX] !== "x") return false;
        }
        return true
    }
}

export function tryPlace(tile, gameboard) {
    if (!(tile)) return false;
    
    const before = gameboard.getFleet().length;
    tile.click();
    const after = gameboard.getFleet().length;
    return after > before;
}

export function resetBoard(gameboard) {
    gameboard.resetAll();

    const setupBoard = document.getElementById('setup-board');
    const setupImageContainer = document.getElementById('setup-image-container');

    setupBoard.innerHTML = '';
    setupImageContainer.innerHTML = '';

    // --- create tiles in board ---
    createGrid(setupBoard);
    const tiles = document.querySelectorAll(".setup-tile");

    // --- state ---
    let selected = "";
    let axis = "x";

    // --- tile click handler (placing ships manually) ---
    setupTileClicks(
        tiles,
        () => selected,      // getter function
        () => axis,              // getter function
        gameboard,
        setupImageContainer
    );
}