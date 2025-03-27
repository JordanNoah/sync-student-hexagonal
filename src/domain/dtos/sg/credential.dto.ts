export default class CredentialDto {
    constructor(
        public referenceId: number,
        public username: string,
        public password: string,
        public type: string
    ){}

    static create(object: { [key: string]: any }): [string?, CredentialDto?] {
        const {reference_id, username, password} = object;
        const messageErrorComplement = 'missing in credential structure';
        if (!reference_id) return [`reference_id ${messageErrorComplement}`, undefined];
        if (!username) return [`username ${messageErrorComplement}`, undefined];
        if (!password) return [`password ${messageErrorComplement}`, undefined];
        if(!object['type']) return [`type ${messageErrorComplement}`, undefined];

        const passwordDecode = new Buffer(password, 'base64');

        return [undefined, new CredentialDto(reference_id, username, passwordDecode.toString(), object['type'])];
    }
}