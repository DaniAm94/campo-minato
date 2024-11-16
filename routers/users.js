const express = require("express");

const router = express.Router();

const users = require("../controllers/users.js");

const validator = require("../middlewares/validator.js");

const { registerBody, loginBody } = require("../validations/users.js");


// Rotte

router.post('/register', validator(registerBody), users.register);  // registrazione

router.post('/login', validator(loginBody), users.login);   // login

module.exports = router;