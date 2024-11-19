
/**
 * Funzione che genera una griglia di gioco
 * @param {*} gameId Id della partita
 * @param {*} difficulty Difficoltà partita
 * @returns {Object} Oggetto di configurazione per creare una griglia
 */
module.exports = (gameId, difficulty) => {
    let width, height, mineCount;

    switch (difficulty) {
        case 'EASY':
            width = 9;
            height = 9;
            mineCount = 10;
            break;
        case 'MEDIUM':
            width = 16;
            height = 16;
            mineCount = 40;
            break;
        case 'HARD':
            width = 30;
            height = 16;
            mineCount = 99;
            break;
        case 'CUSTOM':
            // TODO da implementare
            throw new Error('Non è al momento possibile creare una partita personalizzata');
        default:
            throw new Error('Valore difficoltà non valido!');

    }
    return {
        gameId,
        width,
        height,
        mineCount
    }
}