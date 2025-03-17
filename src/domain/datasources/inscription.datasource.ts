import InscriptionEventDto from "../dtos/inscription/inscription.event.dto";
import AcademicRecordEntity from "../entity/academicRecord.entity";
import InscriptionEntity from "../entity/inscription.entity";

export default abstract class InscriptionDatasource {
    abstract createUpdate(inscriptionEventDto:InscriptionEventDto): Promise<InscriptionEntity>;
    abstract getByUuid(uuid: string): Promise<InscriptionEntity | null>;
    abstract updateByEntity(inscriptionEntity: InscriptionEntity): Promise<InscriptionEntity>;
    abstract getAcademicRecords(): Promise<AcademicRecordEntity[]>;
    abstract getNotProcessedAfterNow(): Promise<AcademicRecordEntity[]>;
    abstract getAcademicRecordByUuid(uuid: string): Promise<AcademicRecordEntity | null>;
}