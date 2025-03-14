import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

interface InscriptionRow {
    id: number,
    uuid: string,
    studentUuid: string,
    programUuid: string,
    programVersionUuid: string | null,
    eventReceivingQueueUuid: string,
    institutionAbbreviation: string,
    modality: string,
    status: string,
    lang: string,
    registeredAt: Date,
    introductoryModule: string | null,
    programStartedAt: Date,
    programFinishedAt: Date,
    extensionFinishedAt: Date,
    processWhen: Date | null,
    processed: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class InscriptionSequelize extends Model<InscriptionRow, Omit<InscriptionRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare studentUuid: string
    declare programUuid: string
    declare programVersionUuid: string | null
    declare eventReceivingQueueUuid: string
    declare institutionAbbreviation: string
    declare modality: string
    declare status: string
    declare lang: string
    declare registeredAt: Date
    declare introductoryModule: string | null
    declare programStartedAt: Date
    declare programFinishedAt: Date
    declare extensionFinishedAt: Date
    declare processWhen: Date | null
    declare processed: boolean
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

InscriptionSequelize.init({
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
    studentUuid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    programUuid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    programVersionUuid: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    eventReceivingQueueUuid: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    institutionAbbreviation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lang: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registeredAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    introductoryModule: {
        type: DataTypes.STRING,
        allowNull: true
    },
    programStartedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    programFinishedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    extensionFinishedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    processWhen: {
        type: DataTypes.DATE,
        allowNull: true
    },
    processed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    timestamps: true,
    tableName: 'inscription',
    underscored: true,
    paranoid: true
})
