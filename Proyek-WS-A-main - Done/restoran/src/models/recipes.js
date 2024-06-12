const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/configsql");

class recipes extends Model{}
recipes.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    vitamin_amount:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    sugar_amount:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    calories:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    alcohol:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    caffeine:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    protein:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    calsium:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
},{
    sequelize,
    modelName: "recipe",
    tableName: "recipe",
    timestamps: false
});

module.exports = recipes;
