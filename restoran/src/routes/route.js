const express = require("express");
const router = express.Router();
const func = require("../function/function");

// punyaku ini
router.post("/users",func.addUser);
router.get("/users");

// pakai yg ini buat kalian (kalau mau)

module.exports = router;