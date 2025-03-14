"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscriptionSequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class InscriptionSequelize extends sequelize_1.Model {
}
exports.InscriptionSequelize = InscriptionSequelize;
InscriptionSequelize.init({
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
    programUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    programVersionUuid: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    eventReceivingQueueUuid: {
        type: sequelize_1.DataTypes.STRING(36),
        allowNull: false
    },
    institutionAbbreviation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    modality: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lang: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    registeredAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    introductoryModule: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    programStartedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    programFinishedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    extensionFinishedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    processWhen: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    processed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    tableName: 'inscription',
    underscored: true,
    paranoid: true
});
