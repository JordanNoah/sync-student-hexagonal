import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import AcademicSelectionEntity from "@/domain/entity/academicSelection.entity";

interface EnrollmentRow {
    id: number,
    uuid: string,
    studentUuid: string,
    inscriptionUuid: string,
    programUuid: string,
    programVersion: string,
    programVersionUuid: string | null,
    academicTermUuid: string | null,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class EnrollmentSequelize extends Model<EnrollmentRow, Omit<EnrollmentRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare studentUuid: string
    declare inscriptionUuid: string
    declare programUuid: string
    declare programVersion: string
    declare programVersionUuid: string | null
    declare academicTermUuid: string | null
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
    declare academicSelections?: AcademicSelectionEntity[]
}

EnrollmentSequelize.init({
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
    inscriptionUuid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    programUuid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    programVersion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    programVersionUuid: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    academicTermUuid: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'enrollment',
    timestamps: true,
    underscored: true,
    paranoid: true
})
