import { MailerTemplateDatasource } from "@/domain/datasources/mail/mailerTemplate.datasource";
import MailerTemplateDto from "@/domain/dtos/mail/mailerTemplate.dto";
import { MailerTemplateEntity } from "@/domain/entity/mail/mailerTemplate.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { MailerTemplateSequelize } from "@/infrastructure/database/models/MailerTemplate";

export class MailerTemplateDatasourceImpl implements MailerTemplateDatasource {
    async register(mailerTemplateRegisterDto: MailerTemplateDto): Promise<MailerTemplateEntity> {
        try {
            const [mailerTemplate, created] = await MailerTemplateSequelize.findOrCreate({
                where: {
                    abbreviation: mailerTemplateRegisterDto.abbreviation
                },
                defaults: {
                    name: mailerTemplateRegisterDto.name,
                    abbreviation: mailerTemplateRegisterDto.abbreviation,
                    doctype: mailerTemplateRegisterDto.doctype,
                    head: mailerTemplateRegisterDto.head,
                    header: mailerTemplateRegisterDto.header,
                    body: mailerTemplateRegisterDto.body,
                    footer: mailerTemplateRegisterDto.footer
                }
            })
            
            if (!created) {
                mailerTemplate.doctype = mailerTemplateRegisterDto.doctype;
                mailerTemplate.head = mailerTemplateRegisterDto.head;
                mailerTemplate.header = mailerTemplateRegisterDto.header;
                mailerTemplate.body = mailerTemplateRegisterDto.body;
                mailerTemplate.footer = mailerTemplateRegisterDto.footer;
                await mailerTemplate.save();
            }

            return MailerTemplateEntity.fromRow(mailerTemplate);
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }

    async getById(id: number): Promise<MailerTemplateEntity> {
        try {
            const mailerTemplate = await MailerTemplateSequelize.findByPk(id);
            if (!mailerTemplate) {
                throw CustomError.notFound('Template not found');
            }
            return MailerTemplateEntity.fromRow(mailerTemplate);
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }

    async getByAbbreviation(abbreviation: string): Promise<MailerTemplateEntity> {
        try {
            const mailerTemplate = await MailerTemplateSequelize.findOne({
                where: {abbreviation}
            });
            if (!mailerTemplate) {
                throw CustomError.notFound('Template not found');
            }
            return MailerTemplateEntity.fromRow(mailerTemplate);
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }
}