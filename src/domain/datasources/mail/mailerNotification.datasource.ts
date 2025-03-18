import MailerNotificationDto from "@/domain/dtos/mail/mailerNotification.dto";
import { MailerNotificationEntity } from "@/domain/entity/mail/mailerNotification.entity";

export abstract class MailerNotificationDatasource {
    abstract register(typeNotificationDto: MailerNotificationDto): Promise<MailerNotificationEntity>;
    abstract getByAbbreviation(abbreviation: string): Promise<MailerNotificationEntity>;
}