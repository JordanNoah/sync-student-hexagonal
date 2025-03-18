export default class MailerTemplateDto {
    constructor(
        public name: string,
        public abbreviation: string,
        public doctype: string,
        public head: string,
        public header: string,
        public body: string,
        public footer: string
    ){}

    static create(object: { [key: string]: any }): [string?, MailerTemplateDto?] {
        const {name, abbreviation, doctype, head, header, body, footer} = object
        const messageErrorComplement = 'missing in mailerTemplate structure'
        if (!name) return [`name ${messageErrorComplement}`, undefined]
        return [
            undefined, 
            new MailerTemplateDto(
                name,
                abbreviation,
                doctype,
                head,
                header,
                body,
                footer
            )
        ]
    }
}