import AcademicRecordEntity from "../entity/academicRecord.entity";

export default abstract class InscriptionRepository {
    abstract getAcademicRecords(): Promise<AcademicRecordEntity[]>;
    abstract getAcademicRecordByUuid(uuid: string): Promise<AcademicRecordEntity | null>
}