const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/configsql");

class menu extends Model{}
menu.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vegetarian: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    vegan: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    glutenFree: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    dairyFree: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    veryHealthy: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    cheap: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    veryPopular: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    sustainable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    servings: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: "menu",
    tableName: "menu",
    timestamps: false
});

module.exports = menu;