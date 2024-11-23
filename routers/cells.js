const express = require("express");

const router = express.Router();

// Controller delle celle
const cells = require("../controllers/cells.js");

// Validatore
const validator = require("../middlewares/validator.js");

// Regole di validazione
const { paramsId } = require("../validations/cells.js");

// Middleware che controlla le celle
const checkCellRevealed = require("../middlewares/checkCellRevealed.js");



// Rotte

router.patch('/:cellId/reveal', validator(paramsId), cells.reveal); // rivela la cella

router.patch('/:cellId/flag', [validator(paramsId), checkCellRevealed], cells.flag); // flagga la cella


module.exports = router;
