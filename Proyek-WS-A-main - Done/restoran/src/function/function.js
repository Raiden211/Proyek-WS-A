const db2 = require('../config/configsql');
const Users = require('../models/Users');
const Recipes = require('../models/recipes');
const Joi = require('joi').extend(require('@joi/date'));
const jwt = require('jsonwebtoken');
const axios = require('axios');
const JWT_KEY = "moyaiislife";

const registerUser = async(req,res) => {
    const {password,confirm_password,dob} = req.body;
    const username = req.body.username;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const role = req.body.role;
    const profile_pic = req.body.profile_pic;

    const schema = Joi.object({
        username: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')).required(),
        email: Joi.string().email().required(),
        phone_number: Joi.number().min(8).max(12).required(),
        password: Joi.string().min(6).pattern().required(),
        confirm_password: Joi.string().valid(Joi.ref('password')).required(),
        dob: Joi.date().format('DD/MM/YYYY').required(),
        role: Joi.number().required(),
        profile_pic: Joi.required()
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        const errorMessage = error.message.replace(/".*?"\s/, '');
        return res.status(400).send({ message: errorMessage });
    }

    let id = 1;
    let paddingLength = id >= 10 ? 3 : 4;
    let userid = "U" + id.toString().padStart(paddingLength, '0');
    let idada = await Users.findByPk(userid);
    while(idada)
    {
        id++;
        paddingLength = id >= 10 ? 3 : 4;
        userid = "U" + id.toString().padStart(paddingLength, '0');
        idada = await Users.findByPk(userid);
    }

    let key = Math.random().toString(36).slice(3);
    let apiada = await Users.findOne({where: {api_key: key}});

    while(apiada)
    {
        key = Math.random().toString(36).slice(3);
        apiada = await Users.findOne({where: {api_key: key}});
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
        type_id: 1
    });

    return res.status(201).send({
        message: "Register sukses",
        data: insert
    })
}

const login = async(req,res) => {
    const password = req.body.password;
    const username = req.body.username;

    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        const errorMessage = error.message.replace(/".*?"\s/, '');
        return res.status(400).send({ message: errorMessage });
    }

    let getrole = await Users.findOne({where: {username: username}});

    let token = jwt.sign({
        username: username,
        role: getrole.role
    }, JWT_KEY, {expiresIn: '120m'});

    return res.status(200).send({
        username: username,
        password: password,
        token: token
    });
}

const getIngredientInfo = async (ingredientId) => {
    const API_KEY = '2c9abc22a9824b79aa4b66320fd9b356';
    try {
        const response = await axios.get(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information`, {
            params: {
                apiKey: API_KEY,
                amount: 1
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error');
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
        const vitaminC = nutrition.find(nutrient => nutrient.name === 'Vitamin C')?.amount || 0;
        const sugar = nutrition.find(nutrient => nutrient.name === 'Sugar')?.amount || 0;
        const calories = nutrition.find(nutrient => nutrient.name === 'Calories')?.amount || 0;
        const alcohol = nutrition.find(nutrient => nutrient.name === 'Alcohol')?.amount || 0;
        const caffeine = nutrition.find(nutrient => nutrient.name === 'Caffeine')?.amount || 0;
        const protein = nutrition.find(nutrient => nutrient.name === 'Protein')?.amount || 0;
        const calsium = nutrition.find(nutrient => nutrient.name === 'Calcium')?.amount || 0;

        // return res.status(200).json(`${name} + ${amount} + ${price} + ${image} + ${vitaminC} + ${sugar} + ${calories} + ${alcohol} + ${caffeine} + ${protein} + ${calcium}`)
        const newRecipe = await Recipes.create({
            name,
            amount,
            price,
            image,
            vitamin_amount: vitaminC,
            sugar_amount: sugar,
            calories,
            alcohol,
            caffeine,
            protein,
            calsium
        });

        return res.status(201).send({
            message: "Recipe berhasil ditambah!",
            data: newRecipe
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const editVitamins = async (req, res) => {
    const { id } = req.params;
    const { vitamin_amount } = req.body;

    try {
        const recipe = await Recipes.findByPk(id);

        if (!recipe) {
            return res.status(404).send({ message: "Ingedient Tidak Ketemu" });
        }

        recipe.vitamin_amount = vitamin_amount;
        await recipe.save();

        return res.status(200).send({
            message: "Vitamin Berhasil Diupdate!",
            data: recipe
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
            data: recipe
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
            message: "Ingedient Berhasil Dihapus!"
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
            data: recipes
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = { registerUser, login, addRecipe, editVitamins, deleteRecipe, showAllRecipes, editAmount };
