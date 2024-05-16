const express = require("express");
const router = express.Router();
const func = require("../function/function");
const miduser = require("../middleware/middlewareuser");

// punyaku ini
router.post("/register",[miduser.cekUserAda,miduser.cekEmailAda,miduser.cekNomorHPAda,miduser.cekRoleValid],func.registerUser);
router.get("/login",miduser.cekUserAda,func.login);

// pakai yg ini buat kalian (kalau mau)

module.exports = router;