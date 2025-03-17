import CredentialDto from "./credential.dto";
import EmailSgDto from "./email.sg.dto";

export default class UserSgDto {
    constructor(
        public uuid: string,
        public name: string,
        public lastName: string,
        public sureName: string,
        public sex: string,
        public emails: EmailSgDto[],
        public credentials: CredentialDto[]
    ){}

    static create(object: { [key: string]: any }): [string?, UserSgDto?] {
        const {uuid, name, last_name, sure_name, sex, emails, credentials} = object;
        const messageErrorComplement = 'missing in user structure';
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined];
        if (!name) return [`name ${messageErrorComplement}`, undefined];
        if (!last_name) return [`last_name ${messageErrorComplement}`, undefined];
        if (!sex) return [`sex ${messageErrorComplement}`, undefined];
        if (!emails) return [`emails ${messageErrorComplement}`, undefined];
        if (!credentials) return [`credentials ${messageErrorComplement}`, undefined];

        const emailsDto: EmailSgDto[] = [];
        for (const email of emails) {
            const [error, emailDto] = EmailSgDto.create(email);
            if (error) return [error, undefined];
            emailsDto.push(emailDto!);
        }

        const credentialsDto: CredentialDto[] = [];

        for (const credential of credentials) {
            const [error, credentialDto] = CredentialDto.create(credential);
            if (error) return [error, undefined];
            credentialsDto.push(credentialDto!);
        }

        return [undefined, new UserSgDto(uuid, name, last_name, sure_name, sex, emailsDto, credentialsDto)];
    }
}