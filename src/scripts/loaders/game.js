import Gameboard from "../classes/Gameboard";
import createGrid from "../modules/createGrid";
import { placeAllRandomShips } from "../modules/gameLogic";
import { renderFleet } from "../modules/render";
import { createBoard } from "../modules/util";

export default function gameLoader() {
    console.log("GAME STARTED");

    const setupShips = document.getElementById('setup-ships');
    const playerBoard = document.getElementById('setup-board');

    setupShips.style.display = "none";
    playerBoard.style.pointerEvents = "none";

    const gameDiv = document.getElementById("game");
    gameDiv.style.width = "80vw";

    createBoard(gameDiv, "opponent");
    const opponentBoard = document.getElementById('opponent-board');
    createGrid(opponentBoard);

    const opponentImages = document.getElementById('opponent-image-container');
    opponentImages.style.zIndex = "0";

    const opponentGameboard = new Gameboard();

    const enemyPlacements = placeAllRandomShips(opponentGameboard);
    renderFleet(opponentGameboard, enemyPlacements, opponentImages, opponentBoard);
    
    const opponentImagesShips = opponentImages.querySelectorAll('.ship');
    opponentImagesShips.forEach(ship => ship.style.opacity = "0");

    console.log(opponentGameboard.getBoard());
}