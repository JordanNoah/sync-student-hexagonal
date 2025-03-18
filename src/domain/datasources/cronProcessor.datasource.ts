import CourseUuid from "../dtos/cron/courseUuid.dto";
import { CoursesUuidDto } from "../dtos/educationalSynchro/course.eduSync.dto";
import GroupCheckEduSyncDto from "../dtos/educationalSynchro/groupCheck.eduSync.dto";
import AcademicRecordEntity from "../entity/academicRecord.entity";
import AcademicSelectionEntity from "../entity/academicSelection.entity";
import InscriptionEntity from "../entity/inscription.entity";
import InstitutionEntity from "../entity/institution.entity";

export default abstract class CronProcessorDatasource {
    abstract processInscriptions(): Promise<void>
    abstract processAcademicSelections(): Promise<void>
    abstract getListOfCourses(academicRecord:AcademicRecordEntity, institution:InstitutionEntity): any[]
    abstract getAcademicPeriodString(academicSelection:AcademicSelectionEntity): string | undefined
    abstract getListBasicGroups(coursesUuidDto:CoursesUuidDto[], inscription:InscriptionEntity, institution:InstitutionEntity, existingCourses: CoursesUuidDto[], listOfCourses: CourseUuid[], programCourse: CoursesUuidDto): GroupCheckEduSyncDto[]
}