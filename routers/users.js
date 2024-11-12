const express = require("express");

const router = express.Router();

const users = require("../controllers/users.js");


// Rotte

router.post('/register', users.register);

router.post('/login', users.login);

module.exports = router;