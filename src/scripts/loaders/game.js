import Gameboard from '../classes/Gameboard.js';
import frigate from '../../assets/frigate.png';
import hawk from '../../assets/hawk.png';
import shadow from '../../assets/shadow.png';
import starfighter from '../../assets/starfighter.png';
import serpent from '../../assets/serpent.png';
import createGrid from '../modules/createGrid.js';
import { putShip } from '../modules/util.js';
import {SHIP_LENGTHS, ALPH} from '../modules/constants.js';
import loadImage from '../modules/assets.js';

export function gameLoader(name) {
    const gameDiv = document.getElementById('game');
    gameDiv.style.display = "flex";

    const board = document.getElementById('setup-board');
    const imageContainer = document.getElementById('setup-image-container');
    const axisButtons = document.querySelectorAll('input[name="axis"]');
    const options = document.querySelectorAll('.setup-option');

    const gameboard = new Gameboard();

    createGrid(board);
    const allTiles = document.querySelectorAll('.setup-tile');

    let selected = "";

    let axis = "x";

    allTiles.forEach(tile => {
        tile.addEventListener("click", e => {
            e.preventDefault();
            if (!selected) return;

            const [col, rowLetter] = tile.id.split('-');
            const x = parseInt(col) - 1;
            const y = ALPH.indexOf(rowLetter);

            const placed = placeShipRequest(selected, x, y, axis);

            if (!placed) {
                console.log("INVALID PLACEMENT");
                return;
            }
            
            const tileRect = tile.getBoundingClientRect();
            const containerRect = imageContainer.getBoundingClientRect();

            const shipImg = putShip({
                gameboard,
                shipName: selected,
                shipLength: SHIP_LENGTHS[selected],
                axis,
                startingPoint: [x, y],
                tileRect,
                containerRect
            });

            imageContainer.appendChild(shipImg);

            document.querySelector(`#${selected} h3`).style.color = '#bc938c';

            const fleet = gameboard.getFleet();
            if (fleet.length === 5) {
                const doneButton = document.getElementById('done-btn');
                doneButton.style.color = "var(--text)";
                doneButton.style.pointerEvents = "initial";
            }
        });
    });

    //placeRandom(board, setSelectedShip, tryPlace);
    const placements = placeAllRandomShips();
    renderRandomShips(placements);

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

    function renderRandomShips(placements) {
        for (const shipName in placements) {
            const { x, y, axis } = placements[shipName];

            const tileId = `${x + 1}-${ALPH[y]}`;
            const tile = document.getElementById(tileId);

            const tileRect = tile.getBoundingClientRect();
            const containerRect = imageContainer.getBoundingClientRect();

            const shipImg = putShip({
                gameboard,
                shipName,
                shipLength: SHIP_LENGTHS[shipName],
                axis,
                startingPoint: [x, y],
                tileRect,
                containerRect
            });

            imageContainer.appendChild(shipImg);
        }
    }
}