const jwt = require('jsonwebtoken');
const JWT_KEY = "moyaiislife";
const db = require('../config/configsql'); 
const Users = require("../models/Users");
const ApiLog = require('../models/apiLog'); 

const authenticateToken = async (req, res, next) => {
    const token = req.headers['x-auth-token'];

    if (!token) {
        return res.status(401).send({ message: 'Perlu Akses Token!' });
    }

    try {
        const user = jwt.verify(token, JWT_KEY);
        req.user = user;

        const userData = await Users.findOne({ where: { username: user.username } });

        if (!userData) {
            return res.status(404).send({ message: 'User tidak ditemukan!' });
        }

        const apiLog = await ApiLog.findOne({ where: { id_type: userData.type_id } });

        if (!apiLog) {
            return res.status(404).send({ message: 'Log API tidak ditemukan!' });
        }

        userData.api_hit -= apiLog.api_per_use;

        if (userData.api_hit < 0) {
            userData.api_hit = 0; 
        }

        await userData.save();

        next();
    } catch (err) {
        return res.status(403).send({ message: 'Token Invalid!' });
    }
};

module.exports = { authenticateToken };
