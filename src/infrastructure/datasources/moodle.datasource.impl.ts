import MoodleDatasource from "@/domain/datasources/moodle.datasource";
import InstitutionEntity from "@/domain/entity/institution.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { ExternalMoodleApiRepository } from "../client/externalMoodleApiRepository";
import SgDatasourceImpl from "./sg.datasource.impl";
import EducationalSynchroDatasource from "@/domain/datasources/educationalSynchro.datasource";
import EducationalSynchroDatasourceImpl from "./educationalSynchro.datasource.impl";
import StudentToMoodleDto from "@/domain/dtos/moodle/student.moodle.dto";
import { CoursesUuidDto } from "@/domain/dtos/educationalSynchro/course.eduSync.dto";
import CourseUuid from "@/domain/dtos/cron/courseUuid.dto";
import EnrollmentMoodleDto from "@/domain/dtos/moodle/enrollment.moodle.dto";

export default class MoodleDatasourceImpl implements MoodleDatasource {
    async syncStudent(studentUuid: string, institution: InstitutionEntity): Promise<StudentToMoodleDto> {
        try {
            const sgStudent = await new SgDatasourceImpl().getStudent(studentUuid)
            const educationalSynchro = await new EducationalSynchroDatasourceImpl().getStudent(studentUuid, institution)
            const studentMoodle = StudentToMoodleDto.fromExternal(sgStudent, educationalSynchro)
            if (!educationalSynchro) {
                const moodleStudent = await new ExternalMoodleApiRepository(institution).createStudent(studentMoodle)
                studentMoodle.id = moodleStudent.data[0].id
                studentMoodle.isCreated = true
            }else{
                await new ExternalMoodleApiRepository(institution).updateStudent(studentMoodle)
                studentMoodle.isCreated = false
            }
            return studentMoodle
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async courseEnrolments(coursesUuidDto:CoursesUuidDto[], coursesUuid:CourseUuid[], student:StudentToMoodleDto, institution:InstitutionEntity): Promise<void> {
        try {
            const coursesToEnrol = coursesUuidDto.map(course => {
                const courseData = coursesUuid.find(couseuuid => couseuuid.uuid === course.uuid)
                return EnrollmentMoodleDto.fromCourseDto(course, student, courseData?.startDate, courseData?.endDate).toJSON()
            })

            const enroll = await new ExternalMoodleApiRepository(institution).enrollUser(coursesToEnrol)
            for (const element of coursesToEnrol) {
                console.log("enroll", enroll);
            }
            
            
            
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}