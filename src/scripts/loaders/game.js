import Gameboard from "../classes/Gameboard";
import setupAttackClicks from "../modules/attackHandler";
import createGrid from "../modules/createGrid";
import { placeAllRandomShips } from "../modules/gameLogic";
import { renderFleet } from "../modules/render";
import { createBoard } from "../modules/util";

export default function gameLoader(playerGameboard) {
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
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(ic => ic.style.zIndex = "0");

    const opponentGameboard = new Gameboard();

    const enemyPlacements = placeAllRandomShips(opponentGameboard);
    renderFleet(opponentGameboard, enemyPlacements, opponentImages, opponentBoard);
    
    const opponentImagesShips = opponentImages.querySelectorAll('.ship');
    //opponentImagesShips.forEach(ship => ship.style.opacity = "0");
    
    const opponentTiles = opponentBoard.querySelectorAll('.setup-tile');
    setupAttackClicks(
        opponentTiles,
        playerGameboard,
        opponentGameboard
    );
}