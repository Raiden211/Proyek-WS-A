const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/configsql");

class apilog extends Model{}
apilog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    api_quota:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    api_per_use:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    sequelize,
    modelName: "api_log",
    tableName: "api_log",
    timestamps: false
});

module.exports = apilog;
