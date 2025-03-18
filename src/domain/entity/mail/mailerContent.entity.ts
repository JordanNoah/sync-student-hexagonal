import { MailerContentSequelize } from "@/infrastructure/database/models/MailerContent";

export class MailerContentEntity {
    constructor(
        public id: number,
        public name: string,
        public abbreviation: string,
        public bodyHeader: string,
        public bodyDescription: string,
        public bodySecondaryDescription: string | null,
        public body: string | null,
        public bodySecondary: string | null,
        public bodyLastDescription: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ) {}

    static fromRow(row: MailerContentSequelize): MailerContentEntity {
        return new MailerContentEntity(
            row.id,
            row.name,
            row.abbreviation,
            row.bodyHeader,
            row.bodyDescription,
            row.bodySecondaryDescription,
            row.body,
            row.bodySecondary,
            row.bodyLastDescription,
            row.createdAt,
            row.updatedAt,
            row.deletedAt
        )
    }
}