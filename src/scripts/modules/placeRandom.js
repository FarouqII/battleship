export default function placeRandom(board, setSelected, tryPlace) {
    const alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    
    const ships = ["starfighter", "hawk", "serpent", "frigate", "shadow"];

    for (const ship of ships) {
        setSelected(ship);

        let placed = false;

        while (!placed) {
            const row = Math.floor(Math.random() * 10) + 1;
            const col = alph[Math.floor(Math.random() * alph.length)];
            const tileId = `${row}-${col}`;
            
            const tile = board.querySelector(`#${CSS.escape(tileId)}`);

            placed = tryPlace(tile);
        }
    }
}