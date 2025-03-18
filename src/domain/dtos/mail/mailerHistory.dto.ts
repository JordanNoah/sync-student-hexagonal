import { MailerNotificationStatus } from "@/infrastructure/database/models/MailerHistory"

export default class MailerHistoryDto {
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
        public sentAt: Date | null
    ){}

    static create(object: { [key: string]: any }): [string?, MailerHistoryDto?] {
        const {id, uuid, mailerNotificationId, studentUuid, subject, to, cc, cco, body, status, attempts, sentAt} = object
        const messageErrorComplement = 'missing in mailerHistory structure'
        if (!mailerNotificationId) return [`mailerNotificationId ${messageErrorComplement}`, undefined]
        if (!studentUuid) return [`studentUuid ${messageErrorComplement}`, undefined]
        if (!subject) return [`subject ${messageErrorComplement}`, undefined]
        if (!to) return [`to ${messageErrorComplement}`, undefined]    
        return [
            undefined, 
            new MailerHistoryDto(
                id,
                uuid,
                mailerNotificationId,
                studentUuid,
                subject,
                to,
                cc,
                cco,
                body,
                status,
                attempts,
                sentAt
            )
        ]
    }
}