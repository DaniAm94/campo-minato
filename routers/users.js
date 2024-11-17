const express = require("express");

const router = express.Router();

const users = require("../controllers/users.js");

const games = require("./games.js");

const validator = require("../middlewares/validator.js");

const { registerBody, loginBody } = require("../validations/users.js");

const auth = require("../middlewares/auth.js");
const validateSlug = require("../middlewares/validateSlug.js");


// Rotte

router.post('/register', validator(registerBody), users.register);  // registrazione

router.post('/login', validator(loginBody), users.login);   // login

router.use(auth);
router.use('/:slug', validateSlug);

router.use('/:slug/games', games)

module.exports = router;