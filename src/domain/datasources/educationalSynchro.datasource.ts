import CourseUuid from "../dtos/cron/courseUuid.dto";
import CoursesEduSyncDto from "../dtos/educationalSynchro/course.eduSync.dto";
import GroupCheckEduSyncDto from "../dtos/educationalSynchro/groupCheck.eduSync.dto";
import { StudentEntity } from "../entity/educationalSynchro.entity";
import InstitutionEntity from "../entity/institution.entity";

export default abstract class EducationalSynchroDatasource {
    abstract getStudent(uuid:string, institution: InstitutionEntity): Promise<StudentEntity | null>;
    abstract getCourses(coursesUuid: CourseUuid[], institution:InstitutionEntity): Promise<CoursesEduSyncDto>;
    abstract createGroups(groups: GroupCheckEduSyncDto[],institution:InstitutionEntity): Promise<GroupCheckEduSyncDto[]>;
    abstract getGroups(groupCheckEduSyncDto:GroupCheckEduSyncDto[]): Promise<any>
}