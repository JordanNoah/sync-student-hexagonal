import { MailerHistorySequelize, MailerNotificationStatus } from "@/infrastructure/database/models/MailerHistory";

export class MailerHistoryEntity {
    constructor(
        public id: number,
        public uuid: string,
        public mailerNotificationId: number,
        public studentUuid: string,
        public subject: string,
        public to: string,
        public cc: string,
        public cco: string,
        public body: string | null,
        public status: MailerNotificationStatus,
        public attempts: number,
        public sentAt: Date | null,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date | null
    ) {}

    static fromRow(history: MailerHistorySequelize): MailerHistoryEntity {
        return new MailerHistoryEntity(
            history.id,
            history.uuid,
            history.mailerNotificationId,
            history.studentUuid,
            history.subject,
            history.to,
            history.cc,
            history.cco,
            history.body,
            history.status,
            history.attempts,
            history.sentAt,
            history.createdAt,
            history.updatedAt,
            history.deletedAt
        )
    }
}
