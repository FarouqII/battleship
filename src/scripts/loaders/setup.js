export function setupLoader(name) {
    const setupDiv = document.getElementById('setup');
    const board = document.getElementById('setup-board');
    const alph = ["A", "B", "c", "D", "E", "F", "G", "H", "I", "J"];

    for (let i = 0; i < 100; i++) {
        const tile = document.createElement("div");
        tile.classList.add("setup-tile");
        tile.id = `${(i % 10) + 1} ${alph[Math.floor(i / 10)]}`;
        board.appendChild(tile);
    }
}