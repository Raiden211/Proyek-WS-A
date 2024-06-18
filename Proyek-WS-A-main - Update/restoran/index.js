const express = require('express');
const bodyParser = require('body-parser');
const proyek = require("./src/routes/route")
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api",proyek);
const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});