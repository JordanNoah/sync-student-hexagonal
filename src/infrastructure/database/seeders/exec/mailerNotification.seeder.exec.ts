import MailerNotificationDto from "@/domain/dtos/mail/mailerNotification.dto";
import { MailerNotificationSeederData } from "../data/mailerNotification.seeder.data";
import { CustomError } from "@/domain/errors/custom.error";
import { MailerNotificationDatasourceImpl } from "@/infrastructure/datasources/mail/mailerNotification.datasource.impl";

export class MailerNotificationSeederExec {
    public async up() {
        try {
            const typeNotificationSeeder = MailerNotificationSeederData;
            for (const typeNotificationData of typeNotificationSeeder) {
                const [error, typeNotificationDto] = MailerNotificationDto.create(typeNotificationData);
                if (error) throw CustomError.internalServer(error)
                const typeNotification = typeNotificationDto!
                await new MailerNotificationDatasourceImpl().register(typeNotification);
            }
        } catch (error) {
            throw CustomError.internalServer(`Error executing TypeNotificationSeeder: ${error}`);
        }
    }
}