const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/configsql');

class Ingredient extends Model {}
Ingredient.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    menuId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Ingredient',
    tableName: 'ingredients',
    timestamps: false
});

module.exports = Ingredient;
