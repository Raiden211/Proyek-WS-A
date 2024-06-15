const Users = require("../models/Users");
const User_role = require('../models/User_role');

// async function cekApiKey (req,res,next) {
//     let token = req.header('x-auth-token');

//     if(!token)
//     {
//         return res.status(403).send({message: "Forbidden"});
//     }

//     let apiKey = await Users.findOne({where: {api_key: token}});

//     if (!apiKey) {
//         return res.status(404).send({ message: "No users found, API KEY Invalid" });
//     }

//     req.user = apiKey;
//     next();
// }

// async function cekApiHit(req, res, next) {
//     let token = req.header('x-auth-token');

//     if(!token)
//     {
//         return res.status(403).send({message: "Forbidden"});
//     }

//     let apiKey = await Users.findOne({where: {api_key: token}});

//     if (apiKey.api_hit < 1) {
//         return res.status(400).send({ message: "API HIT kurang, anda kena rate limit :v" });
//     }

//     next();
// }

async function cekUserAda (req,res,next) {
    const username = req.body.username;

    let userada = await Users.findOne({where: {username: username}});

    if(userada)
    {
        return res.status(400).send({message: "Username sudah ada"});
    }

    next()
}

async function cekUserTerdaftar (req,res,next) {
    const username = req.body.username;

    let userada = await Users.findOne({where: {username: username}});

    if(!userada)
    {
        return res.status(400).send({message: "Username Belum Pernah Terdaftar!"});
    }

    next()
}

async function cekEmailAda (req,res,next) {
    const email = req.body.email;

    let emailada = await Users.findOne({where: {email: email}});

    if(emailada)
    {
        return res.status(400).send({message: "Email sudah ada"});
    }

    next()
}

async function cekNomorHPAda (req,res,next) {
    const phone_number = req.body.phone_number;

    let nomorada = await Users.findOne({where: {phone_number: phone_number}});

    if(nomorada)
    {
        return res.status(400).send({message: "Phone Number sudah ada"});
    }

    next()
}

async function cekRoleValid (req,res,next) {
    const role = req.body.role;

    let roleada = await User_role.findByPk(role);

    if(!roleada)
    {
        return res.status(404).send({message: "Role Tidak Ada"});
    }

    if(role == 1)
    {
        let adminada = await Users.findOne({where: {role: role}});

        if(adminada)
        {
            return res.status(400).send({message: "Administrator udah ada"});
        }
    }

    next()
}

module.exports = {cekUserAda,cekEmailAda,cekNomorHPAda,cekRoleValid,cekUserTerdaftar}