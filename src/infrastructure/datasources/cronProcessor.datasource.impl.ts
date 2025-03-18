import CronProcessorDatasource from "@/domain/datasources/cronProcessor.datasource";
import { CustomError } from "@/domain/errors/custom.error";
import InscriptionDatasourceImpl from "./inscription.datasource.impl";
import InstitutionDatasourceImpl from "./institution.datasource.impl";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import InstitutionEntity from "@/domain/entity/institution.entity";
import AcademicSelectionEntity from "@/domain/entity/academicSelection.entity";
import { getOnlyYearAndMonth } from "@/shared/utils";
import CourseUuid from "@/domain/dtos/cron/courseUuid.dto";
import EducationalSynchroDatasource from "@/domain/datasources/educationalSynchro.datasource";
import EducationalSynchroDatasourceImpl from "./educationalSynchro.datasource.impl";
import MoodleDatasourceImpl from "./moodle.datasource.impl";
import { CoursesUuidDto } from "@/domain/dtos/educationalSynchro/course.eduSync.dto";
import InscriptionEntity from "@/domain/entity/inscription.entity";
import GroupCheckEduSyncDto from "@/domain/dtos/educationalSynchro/groupCheck.eduSync.dto";

export default class CronProcessorDatasourceImpl implements CronProcessorDatasource {
    async processAcademicSelections(): Promise<void> {
        try {
            
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
    async processInscriptions(): Promise<void> {
        try {
            //capturar todas las inscripciones que no han sido procesadas y que posean degrees
            const academicRecords = await new InscriptionDatasourceImpl().getNotProcessedAfterNow()
            for (const academicRecord of academicRecords) {
                //enviar a moodle
                const institution = await new InstitutionDatasourceImpl().getByDegrees(academicRecord.inscription.degrees!)
                if (!institution) {
                    console.log(`Inscription with uuid ${academicRecord.inscription.uuid} didnt found an institution`)
                    continue
                }

                const courseUuid: CourseUuid[] = this.getListOfCourses(academicRecord)
                const courseEduSynchro = await new EducationalSynchroDatasourceImpl().getCourses(courseUuid, institution)
                console.log(courseUuid);
                
                if (courseEduSynchro.missingCourse.length > 0) {
                    //todo: correo electronico avisando la falta de cursos
                }

                if (courseEduSynchro.existingCourses.length > 0) {
                    const programCourse = courseEduSynchro.existingCourses.find(course => course.uuid === academicRecord.inscription.programVersionUuid)
                    if (!programCourse) {
                        console.log(`Inscription with uuid ${academicRecord.inscription.uuid} didnt found the program course`)
                        continue
                    }

                    const student = await new MoodleDatasourceImpl().syncStudent(academicRecord.inscription.studentUuid!, institution)
                    
                    if(!student.isCreated && (academicRecord.inscription.enrollments && academicRecord.inscription.enrollments.length > 0)) {
                        // todo masive unenroll
                    }
                    
                    await new MoodleDatasourceImpl().courseEnrolments(courseEduSynchro.existingCourses, courseUuid, student, institution)
                    
                    const basicGroups = this.getListBasicGroups(courseEduSynchro.existingCourses, academicRecord.inscription, institution, courseEduSynchro.existingCourses, courseUuid, programCourse)
                    
                    const eduGroups = await new EducationalSynchroDatasourceImpl().getGroups(basicGroups)
                    console.log(eduGroups);
                    
                }
            }
            
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
    getListOfCourses(academicRecord: AcademicRecordEntity): CourseUuid[] {
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
    getListBasicGroups(coursesUuidDto:CoursesUuidDto[], inscription:InscriptionEntity, institution:InstitutionEntity, existingCourses: CoursesUuidDto[], listOfCourses: CourseUuid[], programCourse: CoursesUuidDto): GroupCheckEduSyncDto[] {
        try {
            const groupsToChech = coursesUuidDto.flatMap(
                course => {
                    let arrayOfGroups = [
                        new GroupCheckEduSyncDto(`lang.${inscription.lang.toLowerCase()}`,course.id),
                        new GroupCheckEduSyncDto(`org.${institution.abbreviation.toLowerCase()}`,course.id),
                        new GroupCheckEduSyncDto(`program.${programCourse.shortName!.toLowerCase()}`,course.id),
                    ]

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