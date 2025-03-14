"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DegreeSequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class DegreeSequelize extends sequelize_1.Model {
}
exports.DegreeSequelize = DegreeSequelize;
DegreeSequelize.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    inscriptionUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    instituionComing: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'degree',
    timestamps: true,
    underscored: true,
    paranoid: true,
});
