import CourseUuid from "../dtos/cron/courseUuid.dto";
import CoursesEduSyncDto, { CoursesUuidDto } from "../dtos/educationalSynchro/course.eduSync.dto";
import GroupCheckEduSyncDto from "../dtos/educationalSynchro/groupCheck.eduSync.dto";
import GroupEduSyncDto, { MissingGroupEduSyncDto } from "../dtos/educationalSynchro/groups.eduSync.dto";
import { StudentEntity } from "../entity/educationalSynchro.entity";
import InstitutionEntity from "../entity/institution.entity";

export default abstract class EducationalSynchroDatasource {
    abstract getStudent(uuid:string, institution: InstitutionEntity): Promise<StudentEntity | null>;
    abstract getCourses(coursesUuid: CourseUuid[], institution:InstitutionEntity): Promise<CoursesEduSyncDto>;
    abstract createGroups(groups: MissingGroupEduSyncDto[],institution:InstitutionEntity,courseUuids: CoursesUuidDto[]): Promise<GroupCheckEduSyncDto[]>;
    abstract getGroups(groupCheckEduSyncDto:GroupCheckEduSyncDto[]): Promise<GroupEduSyncDto>
}