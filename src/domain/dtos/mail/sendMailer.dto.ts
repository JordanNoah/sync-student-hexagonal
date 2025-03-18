export default class SendMailerDto {
    constructor(
        public to: string[],
        public subject: string,
        public body: string,
        public cc?: string[],
        public cco?: string[],
        public attachments?: { filename: string, path: string }[]
    ){}

    static create(object: { [key: string]: any }): [string?, SendMailerDto?] {
        const {to, subject, body, cc, cco, attachments} = object
        const messageErrorComplement = 'missing in SendMailer structure'
        if (!to) return [`to ${messageErrorComplement}`, undefined]
        if (!subject) return [`subject ${messageErrorComplement}`, undefined]
        if (!body) return [`body ${messageErrorComplement}`, undefined]
        return [
            undefined, 
            new SendMailerDto(
                to,
                subject,
                body,
                cc,
                cco,
                attachments
            )
        ]
    }
}