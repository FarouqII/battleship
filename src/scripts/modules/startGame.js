import { gameLoader } from "../loaders/game";
import createGrid from "./createGrid";

export default function startGame(name, gameboard) {
    const gameDiv = document.getElementById('game');
    const setupShips = document.getElementById('setup-ships');

    setupShips.style.display = "none";
    gameDiv.style.width = "80vw";

    createBoard(gameDiv, "opponent");
    const opponentBoard = document.getElementById('opponent-board');
    createGrid(opponentBoard);
}

function createBoard(parentDiv, boardName) {
    const newBoard = document.createElement('div');
    newBoard.id = `${boardName}-board`;
    newBoard.classList = "board";

    const newImageContainer = document.createElement('div');
    newImageContainer.id = `${boardName}-image-container`;
    newImageContainer.classList = "image-container";

    parentDiv.appendChild(newBoard);
    parentDiv.appendChild(newImageContainer);
}