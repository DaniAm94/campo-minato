const express = require("express");

const router = express.Router();

const games = require("../controllers/games.js");

const validator = require("../middlewares/validator.js");

// Rotte

router.get('/', games.index) // lista partite

router.post('/', games.store);  // crea una partita


module.exports = router;