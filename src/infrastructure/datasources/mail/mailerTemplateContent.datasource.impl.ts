import { CustomError } from "@/domain/errors/custom.error";
import { MailerTemplateContentSequelize } from "@/infrastructure/database/models/MailerTemplateContent";
import { MailerTemplateDatasourceImpl } from "./mailerTemplate.datasource.impl";
import { MailerContentDatasourceImpl } from "./mailerContent.datasource.impl";
import { MailerNotificationDatasourceImpl } from "./mailerNotification.datasource.impl";
import { MailerTemplateContentDatasource } from "@/domain/datasources/mail/mailerTemplateContent.datasource";
import MailerTemplateContentDto from "@/domain/dtos/mail/mailerTemplateContent.dto";
import { MailerTemplateContentEntity } from "@/domain/entity/mail/mailerTemplateContent.entity";
import { MailerTemplateEntity } from "@/domain/entity/mail/mailerTemplate.entity";

export class MailerTemplateContentDatasourceImpl implements MailerTemplateContentDatasource {
    async register(mailerTemplateContentDto: MailerTemplateContentDto): Promise<MailerTemplateContentEntity> {
        try {
            const [mailerNotificationTemplateContent] = await MailerTemplateContentSequelize.findOrCreate({
                where: {
                    mailerTemplateId: mailerTemplateContentDto.mailerTemplateId,
                    mailerContentId: mailerTemplateContentDto.mailerContentId,
                    mailerNotificationId: mailerTemplateContentDto.mailerNotificationId
                },
                defaults: {
                    mailerTemplateId: mailerTemplateContentDto.mailerTemplateId,
                    mailerContentId: mailerTemplateContentDto.mailerContentId,
                    mailerNotificationId: mailerTemplateContentDto.mailerNotificationId
                }
            })
            return MailerTemplateContentEntity.fromRow(mailerNotificationTemplateContent);
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }

    async getBlankHtml(templateAbbreviation: string, contentAbbreviation: string, notificationAbbreviation: string): Promise<string> {
        try {

            const templateEntity = await new MailerTemplateDatasourceImpl().getByAbbreviation(templateAbbreviation);
            const contentEntity = await new MailerContentDatasourceImpl().getByAbbreviation(contentAbbreviation);
            const notificationEntity = await new MailerNotificationDatasourceImpl().getByAbbreviation(notificationAbbreviation);

            const exists = await MailerTemplateContentSequelize.findOne({
                where: {
                    mailerTemplateId: templateEntity.id,
                    mailerContentId: contentEntity.id,
                    mailerNotificationId: notificationEntity.id
                }
            });

            if (!exists) {
                throw CustomError.notFound('Template content not found');
            }
            //build html
            return this.assembleTemplate(
                templateEntity, contentEntity.bodyHeader, contentEntity.bodyDescription, contentEntity.body ?? '', contentEntity.bodyLastDescription, 
                contentEntity.bodySecondaryDescription ?? '', contentEntity.bodySecondary ?? ''
            );
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }


    private assembleTemplate(mailerTemplate: MailerTemplateEntity, dynamicBodyHeader: string, dynamicBodyDescription: string, dynamicBodySecondaryDescription: string,
        dynamicBody: string, dynamicSecondaryBody: string, dynamicBodyLastDescription: string): string {
        return `
        ${mailerTemplate.doctype}
        ${mailerTemplate.head}
        <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Open Sans', sans-serif;" bgcolor="#F5F5F5">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f5f5;" bgcolor="#F5F5F5">
                <tr>
                    <td align="center">
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 24px; text-align: center;">
                                    ${mailerTemplate.header}
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #fafafa; padding: 24px 0; text-align: center;">
                                    ${dynamicBodyHeader}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 24px;">
                                    ${dynamicBodyDescription}
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="1" style="border-collapse: collapse; border-color: #e0e0e0; font-family: 'Open Sans', sans-serif; font-size: 12px; color: #424242;">
                                        ${dynamicBody}
                                    </table>
                                    ${dynamicBodySecondaryDescription}
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="1" style="border-collapse: collapse; border-color: #e0e0e0; font-family: 'Open Sans', sans-serif; font-size: 12px; color: #424242;">
                                        ${dynamicSecondaryBody}
                                    </table>
                                    <div style="margin-top: 20px; font-family: 'Open Sans', sans-serif; font-size: 12px; color: #424242;">
                                        ${dynamicBodyLastDescription}
                                    <div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0 24px 24px 24px; text-align: center;">
                                    ${mailerTemplate.footer}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
        </table>
        </body></html>
        `;
    }
}