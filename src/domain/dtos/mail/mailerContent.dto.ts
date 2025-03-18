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
        
        object.bodyHeader = object.bodyHeader.trim().replace(/\s{2,}/g, ' ');
        object.bodyDescription = object.bodyDescription.trim().replace(/\s{2,}/g, ' ');
        object.bodySecondaryDescription = object.bodySecondaryDescription ? object.bodySecondaryDescription.trim().replace(/\s{2,}/g, ' ') : null;
        object.body = object.body ? object.body.trim().replace(/\s{2,}/g, ' ') : null;
        object.bodySecondary = object.bodySecondary ? object.bodySecondary.trim().replace(/\s{2,}/g, ' ') : null;
        object.bodyLastDescription = object.bodyLastDescription.trim().replace(/\s{2,}/g, ' ');

        return [
            undefined, 
            new MailerContentDto(
                name, 
                abbreviation, 
                bodyHeader, 
                bodyDescription, 
                bodySecondaryDescription, 
                body, 
                bodySecondary, 
                bodyLastDescription
            )
        ]
    }
}