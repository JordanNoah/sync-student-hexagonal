import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";

export abstract class MailerManagmentDatasource {
    abstract notificationCNF(academicRecord: AcademicRecordEntity): Promise<void>;
}