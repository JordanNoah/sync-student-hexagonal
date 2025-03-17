import CourseUuid from "../dtos/cron/courseUuid.dto";
import { CoursesUuidDto } from "../dtos/educationalSynchro/course.eduSync.dto";
import StudentToMoodleDto from "../dtos/moodle/student.moodle.dto";
import InstitutionEntity from "../entity/institution.entity";

export default abstract class MoodleDatasource {
    abstract syncStudent(studentUuid:string, institution:InstitutionEntity): Promise<StudentToMoodleDto>;
    abstract courseEnrolments(coursesUuidDto:CoursesUuidDto[], coursesUuid:CourseUuid[], student:StudentToMoodleDto, institution:InstitutionEntity): Promise<void>;
}