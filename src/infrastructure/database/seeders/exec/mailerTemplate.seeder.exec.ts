import MailerTemplateDto from "@/domain/dtos/mail/mailerTemplate.dto";
import { MailerTemplateSeederData } from "../data/mailerTemplate.seeder.data";
import { CustomError } from "@/domain/errors/custom.error";
import { MailerTemplateDatasourceImpl } from "@/infrastructure/datasources/mail/mailerTemplate.datasource.impl";

export class MailerTemplateSeederExec {
    public async up() {
        try {
            for (const mailerTemplateData of MailerTemplateSeederData) {
                const [error, mailerTemplateDto] = MailerTemplateDto.create(mailerTemplateData);
                if (error) throw CustomError.internalServer(error)
                const mailerTemplate = mailerTemplateDto!
                await new MailerTemplateDatasourceImpl().register(mailerTemplate);
            }
        } catch (error) {
            throw CustomError.internalServer(`Error executing MailerTemplateSeeder: ${error}`);
        }
    }
}