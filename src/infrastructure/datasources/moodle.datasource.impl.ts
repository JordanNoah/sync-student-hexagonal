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
import { GroupElementEduSyncDto } from "@/domain/dtos/educationalSynchro/groups.eduSync.dto";
import AssignGroupMoodleDto from "@/domain/dtos/moodle/assignGroup.moodle.dto";
import UnenrollmentMoodleDto from "@/domain/dtos/moodle/unenrollment.moodle.dto";
import AcademicSelectionEntity from "@/domain/entity/academicSelection.entity";
import InscriptionDatasourceImpl from "./inscription.datasource.impl";
import EnrollmentDatasourceImpl from "./enrollment.datasource.impl";
import InstitutionDatasourceImpl from "./institution.datasource.impl";
import DegreeDatasourceImpl from "./degree.datasource.impl";

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

            await new ExternalMoodleApiRepository(institution).enrollUser(coursesToEnrol)
            
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async assingGroups(groupElementEduSyncDto: GroupElementEduSyncDto[], institution: InstitutionEntity, student: StudentToMoodleDto): Promise<void> {
        try {            
            const groupsToAssign = groupElementEduSyncDto.map(group => {                
                return new AssignGroupMoodleDto(group.externalId, student.id!)
            })

            await new ExternalMoodleApiRepository(institution).assignUserToGroup(groupsToAssign);
            
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
    
    async unenrollStudent(student: StudentToMoodleDto, institution: InstitutionEntity, courses: CoursesUuidDto[]): Promise<void> {
        try {
            const unenrollments = courses.map(course => {
                return new UnenrollmentMoodleDto(student.id!, course.externalId, 5)
            })

            await new ExternalMoodleApiRepository(institution).unenrollUser(unenrollments)
            
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
            
        }
    }

    async discardAcademicSelection(AcademicSelectionEntity: AcademicSelectionEntity): Promise<void> {
        try {
            const enrollment = await new EnrollmentDatasourceImpl().getByUuid(AcademicSelectionEntity.enrollmentUuid)
            if(!enrollment){
                throw CustomError.internalServer("Enrollment not found")
            }
            const inscription = await new InscriptionDatasourceImpl().getByUuid(enrollment.inscriptionUuid)
            if(!inscription){
                throw CustomError.internalServer("Inscription not found")
            }

            const degrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscription.uuid)
            if(degrees.length === 0){
                throw CustomError.internalServer("Degree not found")
            }

            const institution = await new InstitutionDatasourceImpl().getByDegrees(degrees)
            if(!institution){
                throw CustomError.internalServer("Institution not found")
            }

            const student = await this.syncStudent(inscription.studentUuid, institution)
            //const courses = await new EducationalSynchroDatasourceImpl().getCourses(AcademicSelectionEntity.coursesUuid, institution)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}