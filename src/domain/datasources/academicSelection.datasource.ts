import AcademicSelectionEventDto from "../dtos/academicSelection/academicSelection.event.dto";
import { CoursesUuidDto } from "../dtos/educationalSynchro/course.eduSync.dto";
import AcademicSelectionEntity from "../entity/academicSelection.entity";

export default abstract class AcademicSelectionDatasource {
    abstract createUpdate(academicSelectionEventDto:AcademicSelectionEventDto): Promise<AcademicSelectionEntity>;
    abstract getByUuid(uuid:string): Promise<AcademicSelectionEntity | null>;
    abstract deleteById(id:number): Promise<void>;
    abstract getByEnrollmentUuid(enrollmentUuid: string): Promise<AcademicSelectionEntity[]>
    abstract setAcademicSelectionProcessed(academicSelectionEntity: AcademicSelectionEntity[]): Promise<AcademicSelectionEntity[]>;
    abstract setAcademicSelectionNotProcessed(academicSelectionEntity: AcademicSelectionEntity[]): Promise<AcademicSelectionEntity[]>;
    abstract sharedAcademicSelection(course:CoursesUuidDto): Promise<AcademicSelectionEntity | null>
}