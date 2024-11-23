const express = require("express");

const router = express.Router();

const games = require("../controllers/games.js");

const cells = require("./cells.js");

const validator = require("../middlewares/validator.js");

const { paramsId, bodyDifficulty, bodyStatus } = require("../validations/games.js");

// Rotte

router.get('/', games.index); // lista partite

router.post('/', validator(bodyDifficulty), games.store);  // crea una partita

router.get('/:gameId', validator(paramsId), games.show); // restituisce i dettagli di una partita

router.patch('/:gameId', [validator(paramsId), validator(bodyStatus)], games.updateStatus); // aggiorna lo status di una partita

router.delete('/:gameId', validator(paramsId), games.destroy) // cancella una partita

router.get('/:gameId/in-progress', validator(paramsId), games.resume); // riprende una partita in corso

router.use('/:gameId/cells', validator(paramsId), cells) // rotte relative alle celle





module.exports = router;