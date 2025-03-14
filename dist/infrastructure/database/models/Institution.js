"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionSequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class InstitutionSequelize extends sequelize_1.Model {
}
exports.InstitutionSequelize = InstitutionSequelize;
InstitutionSequelize.init({
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
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    fullName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    abbreviation: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    domain: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    website: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    restPath: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    modality: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    translation: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    parent: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: InstitutionSequelize,
            key: 'id'
        }
    },
    importance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    tableName: 'institution',
    underscored: true,
    paranoid: true
});
