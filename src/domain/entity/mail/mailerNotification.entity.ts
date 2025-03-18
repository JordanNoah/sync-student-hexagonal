import { MailerNotificationSequelize } from "@/infrastructure/database/models/MailerNotification";
import { Environment } from "@/shared/types";

export class MailerNotificationEntity {
    constructor(
        public id: number,
        public name: string,
        public abbreviation: string,
        public subject: string,
        public to: { [ key in Environment ]: string[] },
        public cc: { [ key in Environment ]: string[] },
        public cco: { [ key in Environment ]: string[] },
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ) {}

    static fromRow(row: MailerNotificationSequelize): MailerNotificationEntity {
        return new MailerNotificationEntity(
            row.id,
            row.name,
            row.abbreviation,
            row.subject,
            row.to,
            row.cc,
            row.cco,
            row.createdAt,
            row.updatedAt,
            row.deletedAt
        )
    }
}
