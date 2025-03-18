import MailerHistoryDto from "@/domain/dtos/mail/mailerHistory.dto";
import { MailerHistoryEntity } from "@/domain/entity/mail/mailerHistory.entity";
import { MailerNotificationStatus } from "@/infrastructure/database/models/MailerHistory";

export abstract class MailerHistoryDatasource {
    abstract register(mailerHistoryDto: MailerHistoryDto): Promise<MailerHistoryEntity>;
    abstract checkIfNotificationExists(studentUuid: string, mailerId: number): Promise<boolean>;
    abstract updateStatus(uuid: string, status: MailerNotificationStatus): Promise<void>;
}