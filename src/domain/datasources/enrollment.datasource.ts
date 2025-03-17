import EnrollmentEventDto from "../dtos/enrollment/enrollment.event.dto";
import EnrollmentEntity from "../entity/enrollment.entity";

export default abstract class EnrollmentDatasource {
    abstract createUpdate(enrollmentEventDto: EnrollmentEventDto): Promise<EnrollmentEntity>;
    abstract getByUuid(uuid: string): Promise<EnrollmentEntity | null>;
    abstract deleteById(id:number): Promise<void>;
    abstract updateByEntity(enrollmentEntity: EnrollmentEntity): Promise<EnrollmentEntity>;
    abstract getByInscriptionUuid(inscriptionUuid: string): Promise<EnrollmentEntity[]>
}