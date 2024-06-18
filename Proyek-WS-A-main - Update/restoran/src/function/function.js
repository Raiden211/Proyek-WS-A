const db2 = require("../config/configsql");
const Users = require("../models/Users");
const Recipes = require("../models/recipes");
const Menus = require('../models/menus');
const Ingredients = require('../models/ingredient');
const Joi = require("joi").extend(require("@joi/date"));
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Ingredient = require("../models/ingredient");
const JWT_KEY = "moyaiislife";

const registerUser = async (req, res) => {
  const { password, confirm_password, dob } = req.body;
  const username = req.body.username;
  const email = req.body.email;
  const phone_number = req.body.phone_number;
  const role = req.body.role;
  const profile_pic = req.body.profile_pic;

  const schema = Joi.object({
    username: Joi.string()
      .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"))
      .required(),
    email: Joi.string().email().required(),
    phone_number: Joi.number().required(),
    password: Joi.string()
      .min(6)
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"))
      .required(),
    confirm_password: Joi.string().valid(Joi.ref("password")).required(),
    dob: Joi.date().format("DD/MM/YYYY").required(),
    role: Joi.number().required(),
    profile_pic: Joi.required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    const errorMessage = error.message.replace(/".*?"\s/, "");
    return res.status(400).send({ message: errorMessage });
  }

  let id = 1;
  let paddingLength = id >= 10 ? 3 : 4;
  let userid = "U" + id.toString().padStart(paddingLength, "0");
  let idada = await Users.findByPk(userid);
  while (idada) {
    id++;
    paddingLength = id >= 10 ? 3 : 4;
    userid = "U" + id.toString().padStart(paddingLength, "0");
    idada = await Users.findByPk(userid);
  }

  let key = Math.random().toString(36).slice(3);
  let apiada = await Users.findOne({ where: { api_key: key } });

  while (apiada) {
    key = Math.random().toString(36).slice(3);
    apiada = await Users.findOne({ where: { api_key: key } });
  }

  let insert = await Users.create({
    id: userid,
    username: username,
    email: email,
    phone_number: phone_number,
    password: password,
    dob: dob,
    profile_pic: profile_pic,
    saldo: 0,
    api_key: key,
    api_hit: 240,
    role: role,
    status: 1,
    type_id: 1,
  });

  return res.status(201).send({
    message: "Register sukses",
    data: insert,
  });
};

const login = async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    const errorMessage = error.message.replace(/".*?"\s/, "");
    return res.status(400).send({ message: errorMessage });
  }

  let getrole = await Users.findOne({ where: { username: username } });

  let token = jwt.sign(
    {
      username: username,
      role: getrole.role,
    },
    JWT_KEY,
    { expiresIn: "120m" }
  );

  return res.status(200).send({
    username: username,
    password: password,
    token: token,
  });
};

const getIngredientInfo = async (ingredientId) => {
  const API_KEY = "2c9abc22a9824b79aa4b66320fd9b356";
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/food/ingredients/${ingredientId}/information`,
      {
        params: {
          apiKey: API_KEY,
          amount: 1,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

const getMenuInfo = async (menuId) => {
  const API_KEY = "2c9abc22a9824b79aa4b66320fd9b356";
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${menuId}/information`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error");
  }
};

const addRecipe = async (req, res) => {
  const { ingredientId } = req.body;

  try {
    const ingredientInfo = await getIngredientInfo(ingredientId);

    const name = ingredientInfo.name;
    const amount = ingredientInfo.amount;
    const price = ingredientInfo.estimatedCost.value / 100;
    const image = ingredientInfo.image;
    const nutrition = ingredientInfo.nutrition.nutrients;
    const vitaminC =
      nutrition.find((nutrient) => nutrient.name === "Vitamin C")?.amount || 0;
    const vitaminD =
      nutrition.find((nutrient) => nutrient.name === "Vitamin D")?.amount || 0;
    const vitaminE =
      nutrition.find((nutrient) => nutrient.name === "Vitamin E")?.amount || 0;
    const sugar =
      nutrition.find((nutrient) => nutrient.name === "Sugar")?.amount || 0;
    const calories =
      nutrition.find((nutrient) => nutrient.name === "Calories")?.amount || 0;
    const alcohol =
      nutrition.find((nutrient) => nutrient.name === "Alcohol")?.amount || 0;
    const caffeine =
      nutrition.find((nutrient) => nutrient.name === "Caffeine")?.amount || 0;
    const protein =
      nutrition.find((nutrient) => nutrient.name === "Protein")?.amount || 0;
    const calsium =
      nutrition.find((nutrient) => nutrient.name === "Calcium")?.amount || 0;

    // return res.status(200).json(`${name} + ${amount} + ${price} + ${image} + ${vitaminC} + ${sugar} + ${calories} + ${alcohol} + ${caffeine} + ${protein} + ${calcium}`)
    const newRecipe = await Recipes.create({
      name,
      amount,
      price,
      image,
      vitamin_c: vitaminC,
      sugar_amount: sugar,
      calories,
      alcohol,
      caffeine,
      protein,
      calsium,
      vitamin_d: vitaminD,
      vitamin_e: vitaminE,
    });

    return res.status(201).send({
      message: "Recipe berhasil ditambah!",
      data: newRecipe,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const editVitamins = async (req, res) => {
  const { id } = req.params;
  const { vitamin_c, vitamin_d, vitamin_e } = req.body;

  try {
    const recipe = await Recipes.findByPk(id);

    if (!recipe) {
      return res.status(404).send({ message: "Ingedient Tidak Ketemu" });
    }

    recipe.vitamin_c = vitamin_c;
    recipe.vitamin_d = vitamin_d;
    recipe.vitamin_e = vitamin_e;
    await recipe.save();

    return res.status(200).send({
      message: "Vitamin Berhasil Diupdate!",
      data: recipe,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const editAmount = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const recipe = await Recipes.findByPk(id);

    if (!recipe) {
      return res.status(404).send({ message: "Ingedient Tidak Ketemu" });
    }

    recipe.amount = amount;
    await recipe.save();

    return res.status(200).send({
      message: "Jumlah Berhasil Diupdate!",
      data: recipe,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipes.findByPk(id);

    if (!recipe) {
      return res.status(404).send({ message: "Ingedient Tidak Ketemu" });
    }

    await recipe.destroy();

    return res.status(200).send({
      message: "Ingedient Berhasil Dihapus!",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const showAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.findAll();

    return res.status(200).send({
      message: "Ingedient Berhasil Difetch!",
      data: recipes,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const addMenu = async (req, res) => {
  const userData = req.user;

  if (userData.role !== 1 && userData.role !== 4) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  
  const { menuId, ingredients } = req.body;

  if (!menuId) {
    return res.status(400).send({ message: "menuId is required" });
  }
  const checkMenu = await Menus.findByPk(menuId);
  if (checkMenu) {
    return res.status(400).send({ message: "menu already exist" });
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    console.log("Ingredients array is missing or empty in the request body");
    return res.status(400).send({ message: "Ingredients must be a non-empty array" });
  }

  try {
    const menuInfo = await getMenuInfo(menuId);

    const newMenu = await Menus.create({
      id: menuId,
      name: menuInfo.title,
      servings: menuInfo.servings,
      price: menuInfo.pricePerServing,
      vegetarian: menuInfo.vegetarian,
      vegan: menuInfo.vegan,
      glutenFree: menuInfo.glutenFree,
      dairyFree: menuInfo.dairyFree,
      veryHealthy: menuInfo.veryHealthy,
      cheap: menuInfo.cheap,
      veryPopular: menuInfo.veryPopular,
      sustainable: menuInfo.sustainable,
    });

    const ingredientPromises = ingredients.map(ingredient => 
      Ingredients.create({
        name: ingredient.name,
        amount: ingredient.amount,
        menuId: menuId,
      })
    );

    await Promise.all(ingredientPromises);

    return res.status(200).send({
      message: "Menu and ingredients successfully added!",
      data: newMenu,
    });
  } catch (error) {
    console.log("Error while adding menu:", error);
    return res.status(500).send({ message: error.message });
  }
};

const showAllMenus = async (req, res) => {
  try {
    const Menu = await Menus.findAll();

    return res.status(200).send({
      message: "Menu Berhasil Difetch!",
      data: Menu,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const editMenuPrice = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  const userData = req.user;

  if (userData.role !== 1 && userData.role !== 4) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  try {
    const menu = await Menus.findByPk(id);

    if (!menu) {
      return res.status(404).send({ message: "Menu Tidak Ketemu" });
    }

    menu.price = price;
    await menu.save();

    return res.status(200).send({
      message: "Jumlah Berhasil Diupdate!",
      data: menu,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;
  if (userData.role !== 1 && userData.role !== 4) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  try {
    const menu = await Menus.findByPk(id);

    if (!menu) {
      return res.status(404).send({ message: "Menu Tidak Ketemu" });
    }

    await Ingredients.destroy({
      where: { menuId: id }
    });

    await menu.destroy();

    return res.status(200).send({
      message: "Menu Berhasil Dihapus!",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const addIngredients = async (req, res) => {
  const userData = req.user;

  if (userData.role !== 1 && userData.role !== 4) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  
  const { name, amount, menuId } = req.body;
  if (!name) {
    return res.status(400).send({ message: "name is required" });
  }
  if (!amount) {
    return res.status(400).send({ message: "amount is required" });
  }
  if (!menuId) {
    return res.status(400).send({ message: "menuId is required" });
  }
  const ingredients = await Menus.findByPk(menuId);
  if (!ingredients) {
    return res.status(400).send({ message: "menu must exist first!" });
  }

  try {
    const newIngredients = await Ingredient.create({
      name: name,
      amount: amount,
      menuId: menuId,
    });

    return res.status(200).send({
      message: "ingredients successfully added!",
      data: newIngredients,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const editIngredientAmount = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const userData = req.user;

  if (userData.role !== 1 && userData.role !== 4) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  try {
    const ingredients = await Ingredient.findByPk(id);

    if (!ingredients) {
      return res.status(404).send({ message: "Ingredients Tidak Ketemu" });
    }

    ingredients.amount = amount;
    await ingredients.save();

    return res.status(200).send({
      message: "Jumlah Berhasil Diupdate!",
      data: ingredients,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const showAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();

    return res.status(200).send({
      message: "Ingredient Berhasil Difetch!",
      data: ingredients,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteIngredients = async (req, res) => {
  const { id } = req.params;
  const userData = req.user; // Assuming req.user is populated by your authentication middleware

  if (userData.role !== 1 && userData.role !== 4) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  try {
    const ingredient = await Ingredients.findByPk(id);

    if (!ingredient) {
      return res.status(404).send({ message: "Ingredient not found" });
    }

    const menuId = ingredient.menuId;
    const ingredientCount = await Ingredients.count({ where: { menuId } });

    if (ingredientCount <= 1) {
      return res.status(400).send({ message: "Cannot delete the last ingredient of a menu" });
    }

    await ingredient.destroy();

    return res.status(200).send({
      message: "Ingredient deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


module.exports = {
  registerUser,
  login,
  addRecipe,
  editVitamins,
  deleteRecipe,
  showAllRecipes,
  editAmount,
  addMenu,
  showAllMenus,
  editMenuPrice,
  deleteMenu,
  addIngredients,
  showAllIngredients,
  editIngredientAmount,
  deleteIngredients
};
