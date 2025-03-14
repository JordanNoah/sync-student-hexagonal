import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

interface DegreeRow {
    id: number,
    uuid: string,
    inscriptionUuid: string,
    instituionComing: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class DegreeSequelize extends Model<DegreeRow, Omit<DegreeRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare inscriptionUuid: string
    declare instituionComing: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

DegreeSequelize.init({
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
    inscriptionUuid: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    instituionComing: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize,
    tableName: 'degree',
    timestamps: true,
    underscored: true,
    paranoid: true,
})