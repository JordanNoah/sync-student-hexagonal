import InscriptionElementEventDto from "../inscription/inscriptionElement.event.dto"

export default class MailerRequestDto {
    constructor(
        public studentInscription: string,
        public notificationAbbreviation: string,
        public templateAbbreviation: string,
        public contentAbbreviation: string,
        public to: string[],
        public cc?: string[],
        public bcc?: string[],
        public cco?: string[],
        public placeholders?: {[key: string]: any},
    ){}

    static create(object: { [key: string]: any }): [string?, MailerRequestDto?] {
        const {studentInscription, notificationAbbreviation, templateAbbreviation, contentAbbreviation, to, cc, bcc, cco, placeholders} = object
        const messageErrorComplement = 'missing in mailerRequest structure'
        if (!studentInscription) return [`studentInscription ${messageErrorComplement}`, undefined]
        if (!notificationAbbreviation) return [`notificationAbbreviation ${messageErrorComplement}`, undefined]
        if (!templateAbbreviation) return [`templateAbbreviation ${messageErrorComplement}`, undefined]
        if (!contentAbbreviation) return [`contentAbbreviation ${messageErrorComplement}`, undefined]

        return [
            undefined, 
            new MailerRequestDto(
                studentInscription,
                notificationAbbreviation,
                templateAbbreviation,
                contentAbbreviation,
                to,
                cc,
                bcc,
                cco,
                placeholders
            )
        ]
    }
}