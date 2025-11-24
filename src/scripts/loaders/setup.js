import Gameboard from '../classes/gameboard.js';
import Ship from '../classes/ship.js';
import frigate from '../../assets/frigate.png';
import hawk from '../../assets/hawk.png';
import shadow from '../../assets/shadow.png';
import starfighter from '../../assets/starfighter.png';
import serpent from '../../assets/serpent.png';

export function setupLoader(name) {
    const board = document.getElementById('setup-board');
    const imageContainer = document.getElementById('setup-image-container');
    const alph = ["A", "B", "c", "D", "E", "F", "G", "H", "I", "J"];
    const options = document.querySelectorAll('.setup-option');

    const setupBoard = new Gameboard();

    const lengths = {
        "starfighter" : 2,
        "hawk" : 3, 
        "serpent" : 3,
        "frigate" : 4,
        "shadow" : 5
    }

    for (let i = 0; i < 100; i++) {
        const tile = document.createElement("a");
        tile.classList.add("setup-tile");
        tile.id = `${(i % 10) + 1} ${alph[Math.floor(i / 10)]}`;
        board.appendChild(tile);
    }
    const allTiles = document.querySelectorAll('.setup-tile');

    let selected = "";
    options.forEach(option => {
        option.addEventListener('click', e => {
            e.preventDefault();
            selected = option.id;
            options.forEach(option => {
                option.classList = "setup-option";
            })
            option.classList += " selected";
        })
    })

    allTiles.forEach(tile => {
        tile.addEventListener("click", e => {
            e.preventDefault();
            if (!selected) return;

            const tileID = tile.id.split(" ");
            const startingPoint = [alph.indexOf(tileID[1]), parseInt(tileID[0]) - 1];

            const selectedLength = lengths[selected];
            const startX = startingPoint[1];
            const boardWidth = 10;
            
            if (startX + selectedLength > boardWidth) return;
            if (!canPlaceShip(setupBoard.getBoard(), startingPoint[1], startingPoint[0], selectedLength)) return;

            setupBoard.placeShip(new Ship(selected, selectedLength), startingPoint);

            console.log(setupBoard.getBoard());

            const tileRect = tile.getBoundingClientRect();
            const containerRect = imageContainer.getBoundingClientRect();

            const x = tileRect.left - containerRect.left;
            const y = tileRect.top - containerRect.top;

            const tileWidth = tileRect.width;
            const tileHeight = tileRect.height;

            const length = lengths[selected];

            const shipImg = document.createElement("img");
            shipImg.src = loadImage(selected);
            shipImg.classList.add("ship");

            shipImg.style.width = (tileWidth * length) + "px";
            shipImg.style.height = tileHeight + "px";

            shipImg.style.position = "absolute";
            shipImg.style.left = `${x}px`;
            shipImg.style.top = `${y}px`;

            imageContainer.appendChild(shipImg);
        })
    })

    function loadImage(name) {
        switch (name) {
            case "shadow":
                return shadow;

            case "frigate":
                return frigate;
            
            case "serpent":
                return serpent;

            case "hawk":
                return hawk;

            default:
                return starfighter;
        }
    }

    function canPlaceShip(board, startX, startY, length) {
        for (let i = 0; i < length; i++) {
            if (board[startY][startX + i] !== "x") {
                return false; // tile already occupied
            }
        }
        return true;
    }
}