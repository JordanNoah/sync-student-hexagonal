import { MailerTemplateSequelize } from "@/infrastructure/database/models/MailerTemplate";

export class MailerTemplateEntity {
    constructor(
        public id: number,
        public name: string,
        public abbreviation: string,
        public doctype: string,
        public head: string,
        public header: string,
        public body: string | null,
        public footer: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ) {}

    static fromRow(row: MailerTemplateSequelize): MailerTemplateEntity {
        return new MailerTemplateEntity(
            row.id,
            row.name,
            row.abbreviation,
            row.doctype,
            row.head,
            row.header,
            row.body,
            row.footer,
            row.createdAt,
            row.updatedAt,
            row.deletedAt
        )
    }
}