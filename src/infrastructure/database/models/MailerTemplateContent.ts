import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize";
import { MailerTemplateSequelize } from "./MailerTemplate";
import { MailerContentSequelize } from "./MailerContent";
import { MailerNotificationSequelize } from "./MailerNotification";

interface MailerTemplateContentRow {
    id: number;
    mailerTemplateId: number;
    mailerContentId: number;
    mailerNotificationId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export class MailerTemplateContentSequelize extends Model<MailerTemplateContentRow, Omit<MailerTemplateContentRow, 'id'>> {
    declare id: number;
    declare mailerTemplateId: number;
    declare mailerContentId: number;
    declare mailerNotificationId: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date | null;
}

MailerTemplateContentSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    mailerTemplateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MailerTemplateSequelize,
            key: 'id'
        }
    },
    mailerContentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MailerContentSequelize,
            key: 'id'
        }
    },
    mailerNotificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MailerNotificationSequelize,
            key: 'id'
        }
    },
}, {
    sequelize,
    timestamps: true,
    tableName: 'mailer_template_contents',
    underscored: true,
    paranoid: true,
    indexes: [
        {
            name: 'mailer_template_content_mailer_template_id_index',
            fields: ['mailerTemplateId']
        },
        {
            name: 'mailer_template_content_mailer_content_id_index',
            fields: ['mailerContentId']
        },
        {
            name: 'mailer_template_content_mailer_notification_id_index',
            fields: ['mailerNotificationId']
        }
    ]
});