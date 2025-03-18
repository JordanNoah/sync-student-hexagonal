import { MailerContentDatasource } from "@/domain/datasources/mail/mailerContent.datasource";
import MailerContentDto from "@/domain/dtos/mail/mailerContent.dto";
import { MailerContentEntity } from "@/domain/entity/mail/mailerContent.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { MailerContentSequelize } from "@/infrastructure/database/models/MailerContent";

export class MailerContentDatasourceImpl implements MailerContentDatasource {
    async register(mailerContentRegisterDto: MailerContentDto): Promise<MailerContentEntity> {
        try {
            const [mailerContent, created] = await MailerContentSequelize.findOrCreate({
                where: {
                    abbreviation: mailerContentRegisterDto.abbreviation
                },
                defaults: {
                    name: mailerContentRegisterDto.name,
                    abbreviation: mailerContentRegisterDto.abbreviation,
                    bodyHeader: mailerContentRegisterDto.bodyHeader,
                    bodyDescription: mailerContentRegisterDto.bodyDescription,
                    bodySecondaryDescription: mailerContentRegisterDto.bodySecondaryDescription ?? '',
                    body: mailerContentRegisterDto.body ?? '',
                    bodySecondary: mailerContentRegisterDto.bodySecondary ?? '',
                    bodyLastDescription: mailerContentRegisterDto.bodyLastDescription
                }
            });

            if (!created) {
                mailerContent.bodyHeader = mailerContentRegisterDto.bodyHeader;
                mailerContent.bodyDescription = mailerContentRegisterDto.bodyDescription;
                mailerContent.bodySecondaryDescription = mailerContentRegisterDto.bodySecondaryDescription ?? '';
                mailerContent.body = mailerContentRegisterDto.body ?? '';
                mailerContent.bodySecondary = mailerContentRegisterDto.bodySecondary ?? '';
                mailerContent.bodyLastDescription = mailerContentRegisterDto.bodyLastDescription;
                await mailerContent.save();
            }

            return MailerContentEntity.fromRow(mailerContent)
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }

    async getById(id: number): Promise<MailerContentEntity> {
        try {
            const mailerContent = await MailerContentSequelize.findByPk(id);
            if (!mailerContent) {
                throw CustomError.notFound('Content not found');
            }
            return MailerContentEntity.fromRow(mailerContent)
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }

    async getByAbbreviation(abbreviation: string): Promise<MailerContentEntity> {
        try {
            const mailerContent = await MailerContentSequelize.findOne({
                where: { abbreviation }
            });
            if (!mailerContent) {
                throw CustomError.notFound('Content not found');
            }
            return MailerContentEntity.fromRow(mailerContent)
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }
}
