const mongoose = require('mongoose');
const db = require('../config/configmongo');
const db2 = require('../config/configsql');
const Users = require('../models/Users');
const Joi = require('joi').extend(require('@joi/date'));
const jwt = require('jsonwebtoken');
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

module.exports = {registerUser,login};