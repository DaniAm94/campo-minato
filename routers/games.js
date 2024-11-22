const express = require("express");

const router = express.Router();

const games = require("../controllers/games.js");

const cells = require("./cells.js");

const validator = require("../middlewares/validator.js");

// Rotte

router.get('/', games.index); // lista partite

router.post('/', games.store);  // crea una partita

router.get('/:gameId', games.show); // restituisce i dettagli di una partita

router.patch('/:gameId', games.updateStatus); // aggiorna lo status di una partita

router.delete('/:gameId', games.destroy) // cancella una partita

router.get('/:gameId/in-progress', games.resume); // riprende una partita in corso

router.use('/:gameId/cells', cells) // rotte relative alle celle





module.exports = router;