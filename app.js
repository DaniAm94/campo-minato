const express = require("express");
require("dotenv").config();
const port = 8000;
const app = express();

//I middleware

const notFound = require("./middlewares/notFound.js");
const errorHandler = require("./middlewares/errorHandler.js");

//I router
const users = require("./routers/users.js");

app.use(express.json());

app.use('/users', users);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
})