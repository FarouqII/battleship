import Gameboard from '../classes/gameboard.js';
import Ship from '../classes/ship.js';

export function setupLoader(name) {
    const board = document.getElementById('setup-board');
    const alph = ["A", "B", "c", "D", "E", "F", "G", "H", "I", "J"];
    const options = document.querySelectorAll('.setup-option');

    const setupBoard = new Gameboard();

    const lengths = {
        "runner" : 2,
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

            setupBoard.placeShip(new Ship(selected, selectedLength), startingPoint);

            console.log(setupBoard.getBoard());
        })
    })
}