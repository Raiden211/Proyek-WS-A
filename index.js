const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));