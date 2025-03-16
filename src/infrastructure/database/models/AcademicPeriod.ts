import { DataTypes, Model } from "sequelize"
import { sequelize } from "../sequelize"

interface AcademicPeriodRow {
    id: number,
    uuid: string,
    name: string,
    startDate: Date,
    endDate: Date | null,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date | null
}

export class AcademicPeriodSequelize extends Model<AcademicPeriodRow,Omit<AcademicPeriodRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare startDate: Date
    declare endDate: Date | null
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

AcademicPeriodSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    name:{
        type: DataTypes.JSON,
        allowNull: false
    },
    startDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate:{
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'academic_period',
    timestamps: true,
    paranoid: true,
    underscored: true
})