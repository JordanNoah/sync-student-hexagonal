import MailerTemplateDto from "@/domain/dtos/mail/mailerTemplate.dto";
import { MailerTemplateEntity } from "@/domain/entity/mail/mailerTemplate.entity";

export abstract class MailerTemplateDatasource {
    abstract register (mailerTemplateDto: MailerTemplateDto): Promise<MailerTemplateEntity>;
    abstract getById (id: number): Promise<MailerTemplateEntity>;
    abstract getByAbbreviation (abbreviation: string): Promise<MailerTemplateEntity>;
}