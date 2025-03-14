import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

interface AcademicSelectionRow {
    id: number,
    uuid: string,
    enrollmentUuid: string,
    academicElementUuid: string,
    startedAt?: Date,
    finishedAt?: Date,
    callUuid?: string,
    processedAt?: Date | null,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class AcademicSelectionSequelize extends Model<AcademicSelectionRow, Omit<AcademicSelectionRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare enrollmentUuid: string
    declare academicElementUuid: string
    declare startedAt?: Date
    declare finishedAt?: Date
    declare callUuid?: string
    declare processedAt?: Date | null
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

AcademicSelectionSequelize.init({
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
    enrollmentUuid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    academicElementUuid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    startedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    finishedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    callUuid: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    processedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'AcademicSelection',
    timestamps: true,
    paranoid: true,
    tableName: 'academic_selections'
})