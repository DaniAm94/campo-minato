const express = require("express");
require("dotenv").config();
const port = 8000;
const app = express();

//I router
const users = require("./routers/users.js");


app.use('/auth', users);



app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
})