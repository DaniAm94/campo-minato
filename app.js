const express = require("express");
require("dotenv").config();
const port = 8000;
const app = express();



app.listen(port, () => {
    console.log(`Server attivo su http://localhost:${port}`);
})