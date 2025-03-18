import { MailerTemplateContentSequelize } from "@/infrastructure/database/models/MailerTemplateContent";

export class MailerTemplateContentEntity {
    constructor(
        public id: number,
        public mailerTemplateId: number,
        public mailerContentId: number,
        public mailerNotificationId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ) {}

    static fromRow(row: MailerTemplateContentSequelize): MailerTemplateContentEntity {
        return new MailerTemplateContentEntity(
            row.id,
            row.mailerTemplateId,
            row.mailerContentId,
            row.mailerNotificationId,
            row.createdAt,
            row.updatedAt,
            row.deletedAt
        )
    }
}