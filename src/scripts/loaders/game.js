import Gameboard from '../classes/Gameboard.js';
import frigate from '../../assets/frigate.png';
import hawk from '../../assets/hawk.png';
import shadow from '../../assets/shadow.png';
import starfighter from '../../assets/starfighter.png';
import serpent from '../../assets/serpent.png';
import createGrid from '../modules/createGrid.js';
import { putShip } from '../modules/util.js';
import Ship from '../classes/Ship.js';

export function gameLoader(name) {
    const gameDiv = document.getElementById('game');
    gameDiv.style.display = "flex";

    const board = document.getElementById('setup-board');
    const imageContainer = document.getElementById('setup-image-container');
    const axisButtons = document.querySelectorAll('input[name="axis"]');
    const options = document.querySelectorAll('.setup-option');

    const alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const lengths = {
        "starfighter" : 2,
        "hawk" : 3, 
        "serpent" : 3,
        "frigate" : 4,
        "shadow" : 5
    }

    const gameboard = new Gameboard();

    createGrid(board);
    const allTiles = document.querySelectorAll('.setup-tile');

    let selected = "";
    options.forEach(option => {
        option.addEventListener('click', e => {
            e.preventDefault();

            selected = option.id;
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
        const optionImage = document.querySelector(`#${option.id} .option-image`)

        if (optionImage) optionImage.src = loadImage(option.id);
    });

    let axis = "x";
    axisButtons.forEach(button => {
        button.addEventListener("change", e => {
            e.preventDefault();
            axis = button.id.split('-')[1];
        })
    })

    function placeShipRequest(shipName, x, y, axis) {
        const length = lengths[shipName];

        // --- AXIS BOUNDS CHECK ---
        if (axis === "x" && x + length > 10) return false;
        if (axis === "y" && y + length > 10) return false;

        // --- CHECK OVERLAP ---
        if (!canPlace(gameboard.getBoard(), x, y, length, axis)) {
            console.log("OVERLAP");
            return false;
        };

        gameboard.placeShip(
            new Ship(shipName, length, axis),
            [x, y],
            axis
        );

        return true;
    }

    function canPlace(board, x, y, length) {
        if (axis === "x") {
            for (let i = 0; i < length; i++) {
                if (board[y][x + i] !== "x") return false;
            }
        } else {
            for (let i = 0; i < length; i++) {
                if (board[y + i][x] !== "x") return false;
            }
        }
        const fleet = gameboard.getFleet();
        for (const ship of fleet) {
            if (ship.getName() === selected) {
                console.log("EXISTS");
                return;
            }
        }
        return true;
    }

    allTiles.forEach(tile => {
        tile.addEventListener("click", e => {
            e.preventDefault();
            if (!selected) return;

            const [col, rowLetter] = tile.id.split('-');
            const x = parseInt(col) - 1;
            const y = alph.indexOf(rowLetter);

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
                shipLength: lengths[selected],
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

    function placeRandomShip(shipName) {
        while (true) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const axis = Math.random() > 0.5 ? "x" : "y";

            if (placeShipRequest(shipName, x, y, axis)) {
                return { x, y, axis };
            }
        }
    }

    function placeAllRandomShips() {
        const ships = ["starfighter", "hawk", "serpent", "frigate", "shadow"];
        const placements = {};

        for (const ship of ships) {
            const result = placeRandomShip(ship);
            placements[ship] = result;
        }

        return placements;
    }

    function renderRandomShips(placements) {
        for (const shipName in placements) {
            const { x, y, axis } = placements[shipName];

            const tileId = `${x + 1}-${alph[y]}`;
            const tile = document.getElementById(tileId);

            const tileRect = tile.getBoundingClientRect();
            const containerRect = imageContainer.getBoundingClientRect();

            const shipImg = putShip({
                gameboard,
                shipName,
                shipLength: lengths[shipName],
                axis,
                startingPoint: [x, y],
                tileRect,
                containerRect
            });

            imageContainer.appendChild(shipImg);
        }
    }
}