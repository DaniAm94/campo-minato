const express = require("express");

const router = express.Router();

const cells = require("../controllers/cells.js");


// Rotte

router.patch('/:id/reveal', cells.reveal); // rivela la cella

router.patch('/:id/flag', cells.flag); // flagga la cella


module.exports = router;
