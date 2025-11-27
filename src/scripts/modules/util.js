import Ship from "../classes/Ship.js";
import loadImage from "./assets.js";

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
    const newBoard = document.createElement('div');
    newBoard.id = `${boardName}-board`;
    newBoard.classList = "board";

    const newImageContainer = document.createElement('div');
    newImageContainer.id = `${boardName}-image-container`;
    newImageContainer.classList = "image-container";

    parentDiv.appendChild(newBoard);
    parentDiv.appendChild(newImageContainer);
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
            console.log(board);
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