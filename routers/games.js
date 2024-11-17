const express = require("express");

const router = express.Router();

const games = require("../controllers/games.js");

const validator = require("../middlewares/validator.js");

// Rotte

router.post('/', games.create);  // crea una partita


module.exports = router;