const express = require("express");
const router = express.Router();
const func = require("../function/function");
const miduser = require("../middleware/middlewareuser");

// punyaku ini
router.post("/register",[miduser.cekUserAda,miduser.cekEmailAda,miduser.cekNomorHPAda,miduser.cekRoleValid],func.registerUser);
router.get("/login",miduser.cekUserAda,func.login);

// pakai yg ini buat kalian (kalau mau)

//Recipes
router.post("/recipes/addRecipe", func.addRecipe);
router.put("/recipes/:id/amount", func.editAmount);
router.put("/recipes/:id/vitamins", func.editVitamins);
router.delete("/recipes/delete/:id", func.deleteRecipe);
router.get("/recipes", func.showAllRecipes);

module.exports = router;