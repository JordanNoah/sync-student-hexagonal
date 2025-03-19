import CourseUuid from "../dtos/cron/courseUuid.dto";
import { CoursesUuidDto } from "../dtos/educationalSynchro/course.eduSync.dto";
import { GroupElementEduSyncDto } from "../dtos/educationalSynchro/groups.eduSync.dto";
import StudentToMoodleDto from "../dtos/moodle/student.moodle.dto";
import AcademicSelectionEntity from "../entity/academicSelection.entity";
import InstitutionEntity from "../entity/institution.entity";

export default abstract class MoodleDatasource {
    abstract syncStudent(studentUuid:string, institution:InstitutionEntity): Promise<StudentToMoodleDto>;
    abstract courseEnrolments(coursesUuidDto:CoursesUuidDto[], coursesUuid:CourseUuid[], student:StudentToMoodleDto, institution:InstitutionEntity): Promise<void>;
    abstract assingGroups(groupElementEduSyncDto:GroupElementEduSyncDto[], institution:InstitutionEntity, student: StudentToMoodleDto): Promise<void>;
    abstract unenrollStudent(student: StudentToMoodleDto, institution: InstitutionEntity, courses:CoursesUuidDto[]): Promise<void>;
    abstract discardAcademicSelection(AcademicSelectionEntity:AcademicSelectionEntity): Promise<void>;
}