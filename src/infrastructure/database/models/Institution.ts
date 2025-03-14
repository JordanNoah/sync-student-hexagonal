import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

interface InstitutionRow {
    id: number,
    uuid: string,
    name: string,
    fullName: string,
    abbreviation: string,
    domain: string,
    website: string,
    restPath: string,
    modality: string,
    translation: string,
    parent: number | null,
    importance: number | null,
    token: string,
    active: boolean
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class InstitutionSequelize extends Model<InstitutionRow, Omit<InstitutionRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare fullName: string
    declare abbreviation: string
    declare domain: string
    declare website: string
    declare restPath: string
    declare modality: string
    declare translation: string
    declare parent: number | null;
    declare importance: number | null;
    declare token: string
    declare active: boolean
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

InstitutionSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fullName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    abbreviation: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    domain: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    website: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    restPath: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    modality: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    translation: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: InstitutionSequelize,
            key: 'id'
        }
    },
    importance: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    timestamps: true,
    tableName: 'institution',
    underscored: true,
    paranoid: true
})