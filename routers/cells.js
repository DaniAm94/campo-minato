const express = require("express");

const router = express.Router();

// Controller delle celle
const cells = require("../controllers/cells.js");

// Validatore
const validator = require("../middlewares/validator.js");

// Regole di validazione
const { paramsId } = require("../validations/cells.js");



// Rotte

router.patch('/:cellId/reveal', validator(paramsId), cells.reveal); // rivela la cella

router.patch('/:cellId/flag', validator(paramsId), cells.flag); // flagga la cella


module.exports = router;
