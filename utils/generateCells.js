
const getAdjacentCells = (row, column, width, height) => {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],/* currCell */[0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    return directions
        .map(([rowOffset, colOffset]) => ({ row: row + rowOffset, column: column + colOffset })) // Mappo le 8 celle adiacenti
        .filter(({ row, column }) =>
            row >= 0 && row < height && // Controllo che la riga sia valida 
            column >= 0 && column < width); // Controllo che la colonna sia valida
}

/**
 * Funzione per generare un array di celle per la griglia
 * @param {*} gridId ID griglia di gioco
 * @param {*} height Altezza griglia
 * @param {*} width Larghezza griglia
 * @param {*} mineCount Contatore mine 
 * @returns {Array} Array di celle
 */
module.exports = (gridId, height, width, mineCount) => {

    const cells = [];
    const cellMap = new Map(); // Mappa per accesso rapido alle celle



    // Doppio ciclo per assegnare alle celle indice di riga e colonna
    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            const cell = {
                gridId,
                row,
                column,
                isMine: false,
                adjacentMines: 0
            };
            cells.push(cell);
            cellMap.set(`${row},${column}`, cell);  // Salva la cella nella mappa
        }
    }


    //Piazzare le mine
    let placedMines = 0;
    while (placedMines < mineCount) {

        // Prendo un'indice casuale dell'array di cells
        const randomIndex = Math.floor(Math.random() * cells.length);
        const currCell = cells[randomIndex];

        // Piazzo la mina e incremento il contatore di mine piazzate
        if (!currCell.isMine) {
            currCell.isMine = true;
            placedMines++;

            // Ricavo le celle adiacenti
            const adjacentCells = getAdjacentCells(currCell.row, currCell.column, width, height);

            // Incremento il valore adjacentMines per le celle circostanti
            adjacentCells.forEach(({ row, column }) => {
                const adjacentCell = cellMap.get(`${row},${column}`);
                if (adjacentCell) {
                    adjacentCell.adjacentMines++;
                }
            })
        }

    }

    return cells;
}