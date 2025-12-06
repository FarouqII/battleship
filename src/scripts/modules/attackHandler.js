import { renderAttack } from "./render";
import { ALPH } from "./constants";
import hitMarker from '../../assets/hitMarker.svg';
import missMarker from '../../assets/missMarker.svg';

const aiMemory = {
    tried: new Set(),
    targetQueue: [],
    hitsOnCurrentShip: [],
    orientation: null
};

export default function setupAttackClicks(opponentTiles, playerGameboard, opponentGameboard) {
    opponentTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            // --- Player Attack ---
            const coords = tile.id.split('-');
            const y = parseInt(coords[0] - 1);
            const x = parseInt(ALPH.indexOf(coords[1]));

            const result = opponentGameboard.receiveAttack([x, y]);
            const marker = document.createElement('img');
            marker.src = result === 'hit' ? hitMarker : missMarker;
            marker.classList = "marker";
            if (tile.innerHTML === '') tile.appendChild(marker);
            renderAttack(tile, result);
            // renderHitMarker("opponent", y, x);

            if (playerGameboard.isAllSunk() || opponentGameboard.isAllSunk()) {
                console.log("GAME ENEDED");
                document.getElementById('game').innerHTML = '';
                return;
            }

            // --- Opponent AI ---
            opponentAttack(playerGameboard);
            console.log(opponentGameboard.getBoard());
        });
    });
}

function opponentAttack(gameboard) {
    let x, y;

    // --- Choose target (Queued / Random) ---
    if (aiMemory.targetQueue.length > 0) {
        [x, y] = aiMemory.targetQueue.shift();
    } else {
        [x, y] = getRandomUntouchedCell(aiMemory);
    }

    aiMemory.tried.add(`${x},${y}`);

    const result = gameboard.receiveAttack([x, y]);
    // Build tile ID
    const tileId = `${y + 1}-${ALPH[x]}`;

    // Find tile inside the player's board
    const board = document.getElementById("setup-board");
    const tile = board.querySelector(`#${CSS.escape(tileId)}`);

    const marker = document.createElement('img');
    marker.src = result === 'hit' ? hitMarker : missMarker;
    marker.classList = "marker";
    if (tile.innerHTML === '') tile.appendChild(marker);

    // -----------------------------------------------
    // 2. If MISS → nothing else
    // -----------------------------------------------
    if (result === "miss") return;

    // -----------------------------------------------
    // 3. If HIT → update ship tracking
    // -----------------------------------------------
    aiMemory.hitsOnCurrentShip.push([x, y]);

    // Detect orientation once we have 2 hits
    if (aiMemory.hitsOnCurrentShip.length >= 2 && aiMemory.orientation === null) {
        const [h1x, h1y] = aiMemory.hitsOnCurrentShip[0];
        const [h2x, h2y] = aiMemory.hitsOnCurrentShip[1];

        if (h1x !== h2x) aiMemory.orientation = "horizontal";
        else aiMemory.orientation = "vertical";
    }

    // Build next targets based on orientation
    aiMemory.targetQueue = [];

    if (aiMemory.orientation === "horizontal") {
        enqueueIfValid(x - 1, y);
        enqueueIfValid(x + 1, y);
    }
    else if (aiMemory.orientation === "vertical") {
        enqueueIfValid(x, y - 1);
        enqueueIfValid(x, y + 1);
    }
    else {
        // No orientation yet → use 4 neighbors
        enqueueNeighbors(x, y);
    }

    // -----------------------------------------------
    // 4. If the ship got sunk → reset memory
    // -----------------------------------------------
    if (result === "sunk") {
        resetAIMemory();
    }
}

function getRandomUntouchedCell(memory) {
    let x, y;
    do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    } while (memory.tried.has(`${x},${y}`));
    return [x, y];
}

function enqueueNeighbors(x, y) {
    const list = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
    ];
    for (const [nx, ny] of list) enqueueIfValid(nx, ny);
}

function enqueueIfValid(x, y) {
    if (
        x >= 0 && x < 10 &&
        y >= 0 && y < 10 &&
        !aiMemory.tried.has(`${x},${y}`)
    ) {
        aiMemory.targetQueue.push([x, y]);
    }
}

function resetAIMemory() {
    aiMemory.targetQueue = [];
    aiMemory.hitsOnCurrentShip = [];
    aiMemory.orientation = null;
}