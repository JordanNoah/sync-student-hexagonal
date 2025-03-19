import CronProcessorDatasource from "@/domain/datasources/cronProcessor.datasource";
import { CustomError } from "@/domain/errors/custom.error";
import InscriptionDatasourceImpl from "./inscription.datasource.impl";
import InstitutionDatasourceImpl from "./institution.datasource.impl";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import InstitutionEntity from "@/domain/entity/institution.entity";
import AcademicSelectionEntity from "@/domain/entity/academicSelection.entity";
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
            console.log("Academic Records found: ", academicRecords.length);
            
            for (const academicRecord of academicRecords) {
                //enviar a moodle
                await new MoodleDatasourceImpl().enrollFromAcademicRecord(academicRecord)
            }
            
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}