export default class MailerTemplateContentDto {
    constructor(
        public id: number,
        public mailerTemplateId: number,
        public mailerContentId: number,
        public mailerNotificationId: number
    ){}

    static create(object: { [key: string]: any }): [string?, MailerTemplateContentDto?] {
        const {id, mailerTemplateId, mailerContentId, mailerNotificationId} = object
        const messageErrorComplement = 'missing in mailerTemplateContent structure'
        if (!mailerTemplateId) return [`mailerTemplateId ${messageErrorComplement}`, undefined]
        return [
            undefined, 
            new MailerTemplateContentDto(
                id,
                mailerTemplateId,
                mailerContentId,
                mailerNotificationId
            )
        ]
    }
}