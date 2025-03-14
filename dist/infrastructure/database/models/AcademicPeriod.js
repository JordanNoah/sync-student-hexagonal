"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicPeriodSequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class AcademicPeriodSequelize extends sequelize_1.Model {
}
exports.AcademicPeriodSequelize = AcademicPeriodSequelize;
AcademicPeriodSequelize.init({
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
    name: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'academic_period',
    timestamps: true,
    paranoid: true,
    underscored: true
});
