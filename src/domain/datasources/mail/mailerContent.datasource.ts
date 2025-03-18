import MailerContentDto from "@/domain/dtos/mail/mailerContent.dto";
import { MailerContentEntity } from "@/domain/entity/mail/mailerContent.entity";

export abstract class MailerContentDatasource {
    abstract register(mailerContentDto: MailerContentDto): Promise<MailerContentEntity>;
    abstract getById(id: number): Promise<MailerContentEntity>;
    abstract getByAbbreviation(abbreviation: string): Promise<MailerContentEntity>;
}