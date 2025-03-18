import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize";


interface MailerContentRow {
    id: number;
    name: string;
    abbreviation: string;
    bodyHeader: string;
    bodyDescription: string;
    bodySecondaryDescription: string | null;
    body: string | null;
    bodySecondary: string | null;
    bodyLastDescription: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export class MailerContentSequelize extends Model<MailerContentRow, Omit<MailerContentRow, "id">> {
    declare id: number;
    declare name: string;
    declare abbreviation: string;
    declare bodyHeader: string;
    declare bodyDescription: string;
    declare bodySecondaryDescription: string | null;
    declare body: string | null;
    declare bodySecondary: string | null;
    declare bodyLastDescription: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deletedAt: Date | null;
}

MailerContentSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bodyHeader: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bodyDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bodySecondaryDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    bodySecondary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    bodyLastDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    tableName: 'mailer_contents',
    underscored: true,
    paranoid: true
})

