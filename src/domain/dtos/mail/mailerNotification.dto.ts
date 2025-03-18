export default class MailerNotificationDto {
    constructor(
        public name: string,
        public abbreviation: string,
        public subject: string,
        public to: { beta: string[], production: string[] },
        public cc?: { beta: string[], production: string[] },
        public cco?: { beta: string[], production: string[] }
    ){}

    static create(object: { [key: string]: any }): [string?, MailerNotificationDto?] {
        const {name, abbreviation, subject, to, cc, cco} = object
        const messageErrorComplement = 'missing in mailerNotification structure'
        if (!name) return [`name ${messageErrorComplement}`, undefined]
        if (!abbreviation) return [`abbreviation ${messageErrorComplement}`, undefined]
        if (!subject) return [`subject ${messageErrorComplement}`, undefined]
        if (!to) return [`to ${messageErrorComplement}`, undefined]    
        return [
            undefined, 
            new MailerNotificationDto(
                name,
                abbreviation,
                subject,
                to,
                cc,
                cco
            )
        ]
    }
}