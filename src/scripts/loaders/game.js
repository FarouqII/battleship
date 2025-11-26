import Gameboard from '../classes/gameboard.js';
import Ship from '../classes/ship.js';
import frigate from '../../assets/frigate.png';
import hawk from '../../assets/hawk.png';
import shadow from '../../assets/shadow.png';
import starfighter from '../../assets/starfighter.png';
import serpent from '../../assets/serpent.png';
import startGame from '../modules/startGame.js';
import createGrid from '../modules/createGrid.js';
import placeRandom from '../modules/placeRandom.js';

export function gameLoader(name) {
    const gameDiv = document.getElementById('game');
    gameDiv.style.display = "flex";

    const board = document.getElementById('setup-board');
    const imageContainer = document.getElementById('setup-image-container');
    const axisButtons = document.querySelectorAll('input[name="axis"]');
    const alph = ["A", "B", "c", "D", "E", "F", "G", "H", "I", "J"];
    const options = document.querySelectorAll('.setup-option');

    const gameboard = new Gameboard();

    const lengths = {
        "starfighter" : 2,
        "hawk" : 3, 
        "serpent" : 3,
        "frigate" : 4,
        "shadow" : 5
    }

    createGrid(board);
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
        const optionImage = document.querySelector(`#${option.id} .option-image`)

        if (optionImage) optionImage.src = loadImage(option.id);
    })

    let axis = "x";
    axisButtons.forEach(button => {
        button.addEventListener("change", e => {
            e.preventDefault();
            const currentAxis = button.id.split('-')[1];
            axis = currentAxis;
        })
    })

    allTiles.forEach(tile => {
        tile.addEventListener("click", e => {
            e.preventDefault();
            if (!selected) return;

            const setupFleet = gameboard.getFleet();
            for (const ship of setupFleet) {
                if (ship.getName() === selected) {
                    console.log("EXISTS");
                    return;
                }
            }

            const tileID = tile.id.split("-");
            const col = parseInt(tileID[0]) - 1;
            const row = alph.indexOf(tileID[1]);
            const startingPoint = [col, row];

            const shipLength = lengths[selected];
            const boardSize = 10;

            // --- AXIS BOUNDS CHECK ---
            if (axis === "x") {
                if (col + shipLength > boardSize) {
                    console.log("OUT OF BOUNDS");
                    return;
                }
            } else {
                if (row + shipLength > boardSize) {
                    console.log("OUT OF BOUNDS");
                    return;
                }
            }

            // --- CHECK OVERLAP ---
            if (!canPlaceShip(gameboard.getBoard(), col, row, shipLength, axis)) {
                console.log("OVERLAP");
                return;
            }

            // --- PLACE IN INTERNAL BOARD ---
            gameboard.placeShip(new Ship(selected, shipLength, axis), startingPoint, axis);
            console.log(gameboard.getBoard());

            // --- POSITION IN DOM ---
            const tileRect = tile.getBoundingClientRect();
            const containerRect = imageContainer.getBoundingClientRect();

            const x = tileRect.left - containerRect.left;
            const y = tileRect.top - containerRect.top;

            const tileWidth = tileRect.width;
            const tileHeight = tileRect.height;

            const shipImg = document.createElement("img");
            shipImg.src = loadImage(selected);
            shipImg.classList.add("ship");
            shipImg.style.position = "absolute";
            shipImg.style.left = `${x}px`;
            shipImg.style.top = `${y}px`;

            // --- SIZE & ORIENTATION ---
            if (axis === "x") {
                shipImg.style.width = (tileWidth * shipLength) + "px";
                shipImg.style.height = tileHeight + "px";

                shipImg.style.transform = "none";
            } else {
                shipImg.style.width = (tileWidth * shipLength) + "px";
                shipImg.style.height = tileHeight + "px";

                shipImg.style.transformOrigin = "top left";
                shipImg.style.transform = "rotate(90deg) translateY(-100%)";
            }

            imageContainer.appendChild(shipImg);

            document.querySelector(`#${selected} h3`).style.color = '#bc938c';

            if (setupFleet.length === 5) {
                const doneButton = document.getElementById('done-btn');
                doneButton.style.color = "var(--text)";
                doneButton.style.pointerEvents = "initial";

                doneButton.addEventListener('click', e => {
                    e.preventDefault();
                    startGame(name, gameboard);
                })
            }
        });
    });

    placeRandom(board, setSelectedShip, tryPlace);

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

    function canPlaceShip(board, startX, startY, length, axis) {
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

    function setSelectedShip(shipName) {
        selected = shipName;
    }

    function tryPlace(tile) {
        if (!(tile)) return false;
        
        const before = gameboard.getFleet().length;
        tile.click();
        const after = gameboard.getFleet().length;
        return after > before;
    }
}