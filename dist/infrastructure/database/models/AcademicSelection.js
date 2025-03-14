"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSelectionSequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class AcademicSelectionSequelize extends sequelize_1.Model {
}
exports.AcademicSelectionSequelize = AcademicSelectionSequelize;
AcademicSelectionSequelize.init({
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
    enrollmentUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    academicElementUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    startedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    finishedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    callUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    processedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'AcademicSelection',
    timestamps: true,
    paranoid: true,
    tableName: 'academic_selections'
});
