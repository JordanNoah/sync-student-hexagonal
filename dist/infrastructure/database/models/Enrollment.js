"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentSequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class EnrollmentSequelize extends sequelize_1.Model {
}
exports.EnrollmentSequelize = EnrollmentSequelize;
EnrollmentSequelize.init({
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
    studentUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    inscriptionUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    programUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    programVersion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    programVersionUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    academicTermUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'enrollment',
    timestamps: true,
    underscored: true,
    paranoid: true
});
