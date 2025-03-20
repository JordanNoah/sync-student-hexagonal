import { CustomError } from "@/domain/errors/custom.error";
import { MailerBuilderNotificationDatasourceImpl } from "./mailerBuilder.datasource.impl";
import { MailerManagmentDatasource } from "@/domain/datasources/mail/mailerManagement.datasource";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import appConstants from "@/shared/constants";
import MailerRequestDto from "@/domain/dtos/mail/mailerRequest.dto";
import SgDatasourceImpl from "../sg.datasource.impl";
import CoursesEduSyncDto, { CoursesUuidDto } from "@/domain/dtos/educationalSynchro/course.eduSync.dto";
import InstitutionEntity from "@/domain/entity/institution.entity";
import EducationalSynchroDatasourceImpl from "../educationalSynchro.datasource.impl";
import StudentToMoodleDto from "@/domain/dtos/moodle/student.moodle.dto";
import AcademicSelectionEntity from "@/domain/entity/academicSelection.entity";

export class MailerManagmentDatasourceImpl implements MailerManagmentDatasource {
    private readonly buildEmailNotificationDatasourceImpl: MailerBuilderNotificationDatasourceImpl;

    constructor() {
        this.buildEmailNotificationDatasourceImpl = new MailerBuilderNotificationDatasourceImpl();

    }

    async notificationCNF(academicRecord: AcademicRecordEntity, programCourse: CoursesUuidDto, student: StudentToMoodleDto, institution: InstitutionEntity): Promise<void> {
        try {
            const studentUuid = academicRecord.inscription.studentUuid
            const studentUsername = student.username
            const program = programCourse.shortName
            const institutionAbbreviation = institution.abbreviation
            const programVersion = academicRecord.inscription.enrollments?.[0].programVersion;
            const programUuid = academicRecord.inscription.enrollments?.[0].programUuid;
            const programIdNumber = `${programUuid}||${programVersion}`;
            const asignatureUuid = academicRecord.inscription.enrollments?.[0].academicSelections?.[0]?.academicElementUuid;

            const placeholders = {
                courseAbbreviation: 'ABBBBB',
                courseIdNumber: asignatureUuid,
                institutionAbbreviation: institutionAbbreviation,
                studentUsername: studentUsername,
                studentIdNumber: studentUuid,
                program: program,
                programVersion: programVersion,
                programIdNumber: programIdNumber
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