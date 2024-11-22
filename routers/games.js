const express = require("express");

const router = express.Router();

const games = require("../controllers/games.js");

const validator = require("../middlewares/validator.js");

// Rotte

router.get('/', games.index); // lista partite

router.post('/', games.store);  // crea una partita

router.get('/:id/in-progress', games.resume); // riprende una partita in corso


module.exports = router;