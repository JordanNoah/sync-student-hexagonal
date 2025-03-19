export default class MailerContentDto {
    constructor(
        public name: string,
        public abbreviation: string,
        public bodyHeader: string,
        public bodyDescription: string,
        public bodySecondaryDescription: string | null,
        public body: string | null,
        public bodySecondary: string | null,
        public bodyLastDescription: string,
    ){}

    static create(object: { [key: string]: any }): [string?, MailerContentDto?] {
        const {name, abbreviation, bodyHeader, bodyDescription, bodySecondaryDescription, body, bodySecondary, bodyLastDescription} = object
        const messageErrorComplement = 'missing in mailerContent structure'
        if (!name) return [`name ${messageErrorComplement}`, undefined]
        if(!abbreviation) return [`abbreviation ${messageErrorComplement}`, undefined]
        if(!bodyHeader) return [`bodyHeader ${messageErrorComplement}`, undefined]
        if(!bodyDescription) return [`bodyDescription ${messageErrorComplement}`, undefined]
        if(!bodyLastDescription) return [`bodyLastDescription ${messageErrorComplement}`, undefined]
        
        const trimmedBodyHeader = bodyHeader.trim().replace(/\s{2,}/g, ' ');
        const trimmedBodyDescription = bodyDescription.trim().replace(/\s{2,}/g, ' ');
        const trimmedBodySecondaryDescription = bodySecondaryDescription ? bodySecondaryDescription.trim().replace(/\s{2,}/g, ' ') : null;
        const trimmedBody = body ? body.trim().replace(/\s{2,}/g, ' ') : null;
        const trimmedBodySecondary = bodySecondary ? bodySecondary.trim().replace(/\s{2,}/g, ' ') : null;
        const trimmedBodyLastDescription = bodyLastDescription.trim().replace(/\s{2,}/g, ' ');

        return [
            undefined, 
            new MailerContentDto(
                name, 
                abbreviation, 
                trimmedBodyHeader, 
                trimmedBodyDescription, 
                trimmedBodySecondaryDescription, 
                trimmedBody, 
                trimmedBodySecondary, 
                trimmedBodyLastDescription
            )
        ]
    }
}