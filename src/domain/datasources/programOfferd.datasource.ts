import ProgramOfferedAcademicPeriodEventDto from "../dtos/programOffered/programOfferedAcademicPeriod.event.dto";
import ProgramOfferedOffertEventDto from "../dtos/programOffered/programOfferedOffert.event.dto";
import AcademicPeriodEntity from "../entity/academicPeriod.entity";

export default abstract class ProgramOfferedDatasource {
    abstract createUpdate(programOffered: ProgramOfferedAcademicPeriodEventDto): Promise<AcademicPeriodEntity>;
    abstract findByUuid(uuid: string): Promise<AcademicPeriodEntity | undefined>;
}