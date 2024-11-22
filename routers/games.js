const express = require("express");

const router = express.Router();

const games = require("../controllers/games.js");

const cells = require("./cells.js");

const validator = require("../middlewares/validator.js");

// Rotte

router.get('/', games.index); // lista partite

router.post('/', games.store);  // crea una partita

router.get('/:id', games.show); // restituisce i dettagli di una partita

router.patch('/:id', games.updateStatus); // aggiorna lo status di una partita

router.get('/:id/in-progress', games.resume); // riprende una partita in corso

router.use('/:id/cells', cells) // rotte relative alle celle





module.exports = router;