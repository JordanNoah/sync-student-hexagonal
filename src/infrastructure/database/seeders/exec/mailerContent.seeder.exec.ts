import MailerContentDto from "@/domain/dtos/mail/mailerContent.dto";
import { MailerContentSeederData } from "../data/mailerContent.seeder.data";
import { CustomError } from "@/domain/errors/custom.error";
import { MailerContentDatasourceImpl } from "@/infrastructure/datasources/mail/mailerContent.datasource.impl";

export class MailerContentSeederExec {
    public async up() {
        try {
            for (const mailerContentData of MailerContentSeederData) {
                const [error, mailerContentDto] = MailerContentDto.create(mailerContentData);
                if (error) throw CustomError.internalServer(error)
                const mailerContent = mailerContentDto!
                await new MailerContentDatasourceImpl().register(mailerContent);
            }
        } catch (error) {
            throw CustomError.internalServer(`Error executing MailerContentSeeder: ${error}`);
        }
    }
}