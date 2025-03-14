import EnrollmentEventDto from "../dtos/enrollment/enrollment.event.dto";
import EnrollmentEntity from "../entity/enrollment.entity";

export default abstract class EnrollmentDatasource {
    abstract createUpdate(enrollmentEventDto: EnrollmentEventDto): Promise<EnrollmentEntity>;
}