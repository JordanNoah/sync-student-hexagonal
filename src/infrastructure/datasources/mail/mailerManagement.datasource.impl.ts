import { CustomError } from "@/domain/errors/custom.error";
import { MailerBuilderNotificationDatasourceImpl } from "./mailerBuilder.datasource.impl";
import { MailerManagmentDatasource } from "@/domain/datasources/mail/mailerManagement.datasource";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import appConstants from "@/shared/constants";
import MailerRequestDto from "@/domain/dtos/mail/mailerRequest.dto";

export class MailerManagmentDatasourceImpl implements MailerManagmentDatasource {
    private readonly buildEmailNotificationDatasourceImpl: MailerBuilderNotificationDatasourceImpl;

    constructor() {
        this.buildEmailNotificationDatasourceImpl = new MailerBuilderNotificationDatasourceImpl();

    }

    async notificationCNF(academicRecord: AcademicRecordEntity): Promise<void> {
        try {
            const studentUuid = academicRecord.inscription?.studentUuid
            // const studentUsername = academicRecord.
            // if (!studentUsername) { throw CustomError.notFound('Student not found'); }

            const placeholders = {
            };

            const [error, emailRequestDto] = MailerRequestDto.create({
                studentUuid: studentUuid,
                notificationAbbreviation: appConstants.MAILER.NOTIFICATIONS.COURSE_NOT_FOUND.ABBREVIATION,
                templateAbbreviation: appConstants.MAILER.TEMPLATE.BASE.ABBREVIATION,
                contentAbbreviation: appConstants.MAILER.CONTENT.COURSE_NOT_FOUND.ABBREVIATION,
                to: [],
                cc: [],
                bcc: [],
                placeholders
            });

            if (error) throw CustomError.internalServer('Error creating EmailRequestDto');
            if (emailRequestDto) await this.buildEmailNotificationDatasourceImpl.sendNotification(emailRequestDto);
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }
}