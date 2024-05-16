const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Users extends Model{}
Users.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profile_pic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    saldo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    api_key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    api_hit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    sequelize,
    modelName: "Users",
    tableName: "users",
    timestamps: false
});

module.exports = Users;