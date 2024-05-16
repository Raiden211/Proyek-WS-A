const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class User_role extends Model{}
User_role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    sequelize,
    modelName: "User_role",
    tableName: "user_role",
    timestamps: false
});

module.exports = User_role;