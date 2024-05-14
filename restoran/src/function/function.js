const mongoose = require('mongoose');
const db = require('../config/configmongo');
const Users = require('../models/Users');
const joi = require("joi");

const addUser = async(req,res) => {
    const {username,email,phone_number,password,role} = req.body;

}

module.exports = {addUser};

async function checkUserExistence(username,email,phone_number,password,role) {
    try {
        let userada = await Users.find({ username: username });

        if (userada && userada.length > 0) {
            return { status: 400, message: "User Ada" };
        }
    } catch (error) {
        console.error("Error:", error);
        return { status: 500, message: "Internal Server Error" };
    }
}