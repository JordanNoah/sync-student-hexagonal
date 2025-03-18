import MailerTemplateContentDto from "@/domain/dtos/mail/mailerTemplateContent.dto";
import { MailerTemplateContentEntity } from "@/domain/entity/mail/mailerTemplateContent.entity";

export abstract class MailerTemplateContentDatasource {
    abstract register(MailerTemplateContentDto: MailerTemplateContentDto): Promise<MailerTemplateContentEntity>;
    abstract getBlankHtml(templateAbbreviation: string, contentAbbreviation: string, notificationAbbreviation: string): Promise<string>;
}