import Typed from "typed.js";

import Gameboard from "../classes/Gameboard";

import setupAttackClicks from "../modules/attackHandler";
import createGrid from "../modules/createGrid";
import { placeAllRandomShips } from "../modules/gameLogic";
import { renderFleet } from "../modules/render";
import { createBoard } from "../modules/util";

import loader from '../../assets/loader.svg';

export default function gameLoader(playerGameboard) {
    console.log("GAME STARTED");

    const setupShips = document.getElementById('setup-ships');
    const playerBoard = document.getElementById('setup-board');

    setupShips.style.display = "none";
    playerBoard.style.pointerEvents = "none";

    const displayDiv = document.getElementById('display');
    const gameDiv = document.getElementById("game");
    const overlayDiv = document.getElementById("overlay");

    gameDiv.style.opacity = "0";
    document.getElementById('topbar').style.opacity = "0";
    overlayDiv.style.opacity = "1";
    document.getElementById('overlay-icon').src = loader;
    const overlayHeader = new Typed('#overlay-header', {
        strings: ["Setting up frontlines...", "Acquiring intel...", "Approaching battlefield..."],
        typeSpeed: 75,
        backSpeed: 75,
        typeDelay: 500,
    });
    setTimeout(() => {
        overlayDiv.style.opacity = "0";
        document.getElementById('topbar').style.opacity = "1";
        gameDiv.style.opacity = "1";
        displayDiv.style.width = "80vw";
    }, 10000);

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