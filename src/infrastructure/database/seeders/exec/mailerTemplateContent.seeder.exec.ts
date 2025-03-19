import { CustomError } from "@/domain/errors/custom.error";
import { MailerTemplateContentSeederData } from "../data/mailerTemplateContent.seeder.data";
import { MailerNotificationDatasourceImpl } from "@/infrastructure/datasources/mail/mailerNotification.datasource.impl";
import { MailerTemplateDatasourceImpl } from "@/infrastructure/datasources/mail/mailerTemplate.datasource.impl";
import { MailerContentDatasourceImpl } from "@/infrastructure/datasources/mail/mailerContent.datasource.impl";
import MailerTemplateContentDto from "@/domain/dtos/mail/mailerTemplateContent.dto";
import { MailerTemplateContentDatasourceImpl } from "@/infrastructure/datasources/mail/mailerTemplateContent.datasource.impl";

export class MailerTemplateContentSeederExec {
    public async up() {
        try {
            for (const mailerConnectData of MailerTemplateContentSeederData) {
                //get type notification
                const notificationEntity = await new MailerNotificationDatasourceImpl().getByAbbreviation(mailerConnectData.notificationAbbreviation);
                if (!notificationEntity) throw CustomError.internalServer(`Notification ${mailerConnectData.notificationAbbreviation} not found`);
                // get template base
                const templateEntity = await new MailerTemplateDatasourceImpl().getByAbbreviation(mailerConnectData.templateAbbreviation);
                if (!templateEntity) throw CustomError.internalServer(`Template ${mailerConnectData.templateAbbreviation} not found`);
                // get content notification
                const contentEntity = await new MailerContentDatasourceImpl().getByAbbreviation(mailerConnectData.contentAbbreviation);
                if (!contentEntity) throw CustomError.internalServer(`Content ${mailerConnectData.contentAbbreviation} not found`);

                const [error, mailerConnectDto] = MailerTemplateContentDto.create({
                    mailerTemplateId: templateEntity.id,
                    mailerContentId: contentEntity.id,
                    mailerNotificationId: notificationEntity.id,
                });

                if (error) throw CustomError.internalServer(error);

                const mailerConnect = mailerConnectDto!;
                await new MailerTemplateContentDatasourceImpl().register(mailerConnect);
            }
        } catch (error) {
            console.error(`Error executing MailerConnectSeeder: ${error}`);
            throw CustomError.internalServer(`Error executing MailerConnectSeeder: ${error}`);
        }
    }
}