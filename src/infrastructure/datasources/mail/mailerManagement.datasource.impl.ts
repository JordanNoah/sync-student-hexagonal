import { CustomError } from "@/domain/errors/custom.error";
import { MailerBuilderNotificationDatasourceImpl } from "./mailerBuilder.datasource.impl";
import { MailerManagmentDatasource } from "@/domain/datasources/mail/mailerManagement.datasource";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import appConstants from "@/shared/constants";
import MailerRequestDto from "@/domain/dtos/mail/mailerRequest.dto";
import SgDatasourceImpl from "../sg.datasource.impl";

export class MailerManagmentDatasourceImpl implements MailerManagmentDatasource {
    private readonly buildEmailNotificationDatasourceImpl: MailerBuilderNotificationDatasourceImpl;

    constructor() {
        this.buildEmailNotificationDatasourceImpl = new MailerBuilderNotificationDatasourceImpl();

    }

    async notificationCNF(academicRecord: AcademicRecordEntity): Promise<void> {
        try {
            const studentUuid = academicRecord.inscription.studentUuid
            // sgStudent = await new SgDatasourceImpl().getStudent(studentUuid)
            const studentUsername = 'LAKSD123J'
            //sgStudent.credentials[0].username
            const institutionAbbreviation = academicRecord.inscription.institutionAbbreviation
            const programVersion = academicRecord.inscription.enrollments?.[0]?.programVersion;
            if (!programVersion) {
                throw CustomError.internalServer('Program version is undefined');
            }
            

            const placeholders = {
                courseAbbreviation: 'ABBBBB',
                courseIdNumber: '123456',
                institutionAbbreviation: institutionAbbreviation,
                studentUsername: studentUsername,
                studentIdNumber: studentUuid,
                program: 'PROGRAM',
                programVersion: programVersion,
                programIdNumber: '123456'
            };

            const [error, emailRequestDto] = MailerRequestDto.create({
                studentInscription: studentUuid,
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
            console.log(error)
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }
}