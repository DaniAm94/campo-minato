const express = require("express");

const router = express.Router();

const cells = require("../controllers/cells.js");


// Rotte

router.patch('/:cellId/reveal', cells.reveal); // rivela la cella

router.patch('/:cellId/flag', cells.flag); // flagga la cella


module.exports = router;
