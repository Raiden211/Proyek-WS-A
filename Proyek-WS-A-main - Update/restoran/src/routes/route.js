const express = require("express");
const router = express.Router();
const func = require("../function/function");
const miduser = require("../middleware/middlewareuser");
const midrecipes = require("../middleware/middlewarerecipes");

// punyaku ini
router.post("/register",[miduser.cekUserAda,miduser.cekEmailAda,miduser.cekNomorHPAda,miduser.cekRoleValid],func.registerUser);
router.get("/login",miduser.cekUserTerdaftar,func.login);

// pakai yg ini buat kalian (kalau mau)

//Recipes
router.post("/recipes/addRecipe", midrecipes.authenticateToken,func.addRecipe);
router.put("/recipes/:id/amount", midrecipes.authenticateToken, func.editAmount);
router.put("/recipes/:id/vitamins",midrecipes.authenticateToken, func.editVitamins);
router.delete("/recipes/delete/:id",midrecipes.authenticateToken, func.deleteRecipe);
router.get("/recipes",midrecipes.authenticateToken,func.showAllRecipes);

//Menus
router.post("/menus/addMenu", midrecipes.authenticateToken,func.addMenu);
router.get("/menus", midrecipes.authenticateToken,func.showAllMenus);
router.put("/menus/price/:id", midrecipes.authenticateToken,func.editMenuPrice);
router.delete("/menus/delete/:id", midrecipes.authenticateToken,func.deleteMenu);
module.exports = router;