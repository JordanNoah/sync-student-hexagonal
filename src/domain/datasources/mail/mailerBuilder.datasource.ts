import MailerRequestDto from "@/domain/dtos/mail/mailerRequest.dto";
import SendMailerDto from "@/domain/dtos/mail/sendMailer.dto";

export abstract class MailerBuilderNotificationDatasource {
    abstract buildNotification(): Promise<SendMailerDto>;
    abstract sendNotification(mailerRequest: MailerRequestDto): Promise<void>;
}