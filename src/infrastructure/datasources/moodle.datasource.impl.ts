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
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import { getOnlyYearAndMonth } from "@/shared/utils";
import GroupCheckEduSyncDto from "@/domain/dtos/educationalSynchro/groupCheck.eduSync.dto";
import InscriptionEntity from "@/domain/entity/inscription.entity";
import ProgramOfferedDatasourceImpl from "./programOffered.datasource.impl";

export default class MoodleDatasourceImpl implements MoodleDatasource {
    async enrollFromAcademicRecord(academicRecord: AcademicRecordEntity): Promise<void> {
        try {
            const institution = await new InstitutionDatasourceImpl().getByDegrees(academicRecord.inscription.degrees!)
                if (institution) {
                    const courseUuid = await this.getListOfCourses(academicRecord)
                    const courseEduSynchro = await new EducationalSynchroDatasourceImpl().getCourses(courseUuid, institution)

                    if (courseEduSynchro.missingCourse.length > 0) {
                        //todo: correo electronico avisando la falta de cursos
                    }

                    if (courseEduSynchro.existingCourses.length > 0) {
                        const programCourse = courseEduSynchro.existingCourses.find(course => course.uuid === academicRecord.inscription.programVersionUuid)
                        if (programCourse) {
                            const student = await new MoodleDatasourceImpl().syncStudent(academicRecord.inscription.studentUuid!, institution)

                            if(!student.isCreated && (academicRecord.inscription.enrollments && academicRecord.inscription.enrollments.length > 0)) {
                                // todo masive unenroll
                                await new MoodleDatasourceImpl().unenrollStudent(student, institution, courseEduSynchro.existingCourses)
                            }
                        
                            await new MoodleDatasourceImpl().courseEnrolments(courseEduSynchro.existingCourses, courseUuid, student, institution)
                            console.log(courseEduSynchro.existingCourses, academicRecord.inscription, institution, courseUuid, programCourse);
                            
                            const basicGroups = this.getListBasicGroups(courseEduSynchro.existingCourses, academicRecord.inscription, institution, courseUuid, programCourse)
                        
                            const eduGroups = await new EducationalSynchroDatasourceImpl().getGroups(basicGroups)
                        
                            if (eduGroups.missingGroups.length > 0) {
                                const createGroups = await new EducationalSynchroDatasourceImpl().createGroups(eduGroups.missingGroups, institution, courseEduSynchro.existingCourses)
                                eduGroups.existGroups.push(...createGroups)
                            }
                            console.log("grupo: ",eduGroups);
                            
                            await new MoodleDatasourceImpl().assingGroups(eduGroups.existGroups, institution, student)
                        
                            //actualizar todo a hecho en db
                            await new InscriptionDatasourceImpl().setAcademicRecordPrcessed(academicRecord)
                        }
                    }
                }
                
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

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
        console.log('data',groupElementEduSyncDto);
        try {            
            const groupsToAssign = groupElementEduSyncDto.map(group => {
                console.log(group);               
                return new AssignGroupMoodleDto(group.externalId, student.id!)
            })

            console.log('final',groupsToAssign);
            
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

            if (inscription.processed) {
                const student = await this.syncStudent(inscription.studentUuid, institution)
                const courses = await new EducationalSynchroDatasourceImpl().getCourses([new CourseUuid('course',AcademicSelectionEntity.academicElementUuid)], institution)
                if (courses.existingCourses.length > 0) {
                    await this.unenrollStudent(student, institution, courses.existingCourses)
                }

                if (courses.missingCourse.length > 0){
                    //TO DO: enviar correo de curso faltante
                }
                
            }
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async getListOfCourses(academicRecord: AcademicRecordEntity): Promise<CourseUuid[]> {
        try {
            const coursesUuids: CourseUuid[] = []
            
            //programa
            coursesUuids.push(new CourseUuid(
                "program",
                academicRecord.inscription.programVersionUuid!,
                academicRecord.inscription.programStartedAt,
                academicRecord.inscription.programFinishedAt
            ))
            //modulo introductorio
            if (academicRecord.inscription.introductoryModule) {
                coursesUuids.push(new CourseUuid(
                    "introductory",
                    academicRecord.inscription.introductoryModule,
                    undefined,
                    undefined
                ))
            }
            //cursos
            if (academicRecord.inscription.enrollments && academicRecord.inscription.enrollments.length > 0) {
                for (const enrollment of academicRecord.inscription.enrollments) {
                    coursesUuids.push(
                        ...enrollment.academicSelections!.flatMap( academicSelection => {
                                return new CourseUuid(
                                    "course",
                                    academicSelection.academicElementUuid,
                                    academicSelection.startedAt,
                                    academicSelection.finishedAt,
                                    this.getAcademicPeriodString(academicSelection)
                                )
                            }
                        ))
                }
            }
            return coursesUuids
        } catch (error) {
            CustomError.throwAnError(error)
            return []
        }
    }

    getAcademicPeriodString(academicSelection: AcademicSelectionEntity): string | undefined {
        try {
            if (academicSelection.academicPeriod) {
                const response = getOnlyYearAndMonth(academicSelection.academicPeriod.startDate)
                return response ? response : undefined
            }
            return undefined
        } catch (error) {
            CustomError.throwAnError(error)
            return undefined
        }
    }

    getListBasicGroups(coursesUuidDto:CoursesUuidDto[], inscription:InscriptionEntity, institution:InstitutionEntity, listOfCourses: CourseUuid[], programCourse: CoursesUuidDto): GroupCheckEduSyncDto[] {
        try {
            const groupsToChech = coursesUuidDto.flatMap(
                course => {
                    let arrayOfGroups = [
                        new GroupCheckEduSyncDto(`lang.${inscription.lang.toLowerCase()}`,course.externalId),
                        new GroupCheckEduSyncDto(`org.${institution.abbreviation.toLowerCase()}`,course.externalId),
                        new GroupCheckEduSyncDto(`program.${programCourse.shortName!.split("-")[0]!.toLowerCase()}`,course.externalId),
                    ]

                    const coursedata = listOfCourses.find(courseuuid => courseuuid.uuid === course.uuid)
                    if (coursedata && coursedata.academicPeriod) {
                        arrayOfGroups.push(
                            new GroupCheckEduSyncDto(`term.${coursedata.academicPeriod}`,course.externalId)
                        )
                    }
                    console.log(arrayOfGroups);
                    
                    return arrayOfGroups
                }
            )
            return groupsToChech
        } catch (error) {
            CustomError.throwAnError(error)
            return []
        }
    }
}