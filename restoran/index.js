const express = require('express');
const mongoose = require('mongoose');
const db = require('./src/config/configmongo');
const proyek = require("./src/routes/route")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",proyek);
const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});