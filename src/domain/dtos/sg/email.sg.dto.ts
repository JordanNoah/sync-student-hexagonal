export default class EmailSgDto {
    constructor(
        public referenceId: string,
        public email: string,
        public defaultMail: boolean,
        public types: string[],
        public typeMail: string,
    ){}

    static create(object: { [key: string]: any }): [string?, EmailSgDto?] {
        const {reference_id, email, types} = object;
        const messageErrorComplement = 'missing in email structure';
        if (!reference_id) return [`reference_id ${messageErrorComplement}`, undefined];
        if (!email) return [`email ${messageErrorComplement}`, undefined];
        if (!types) return [`types ${messageErrorComplement}`, undefined];
        if (!object['type']) return [`type_mail ${messageErrorComplement}`, undefined];

        return [undefined, new EmailSgDto(reference_id, email, object["default"], types, object['type'])];
    }
}