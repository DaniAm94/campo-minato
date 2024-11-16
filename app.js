const express = require("express");
require("dotenv").config();
const port = 8000;
const app = express();

//I middleware

const notFound = require("./middlewares/notFound.js");

//I router
const users = require("./routers/users.js");

app.use(express.json());


app.use('/users', users);


app.use(notFound);

app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
})