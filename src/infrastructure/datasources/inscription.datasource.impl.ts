import InscriptionDatasource from "@/domain/datasources/inscription.datasource";
import InscriptionEventDto from "@/domain/dtos/inscription/inscription.event.dto";
import { CustomError } from "@/domain/errors/custom.error";
import { InscriptionSequelize } from "../database/models";
import { addMinutes } from "@/shared/utils";
import InscriptionEntity from "@/domain/entity/inscription.entity";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import DegreeDatasourceImpl from "./degree.datasource.impl";
import AcademicSelectionDatasourceImpl from "./academicSelection.datasource.impl";
import EnrollmentDatasourceImpl from "./enrollment.datasource.impl";
import { Op } from "sequelize";

export default class InscriptionDatasourceImpl implements InscriptionDatasource {
    async createUpdate(inscriptionEventDto: InscriptionEventDto): Promise<InscriptionEntity> {
        try {
            const processWhen = addMinutes(inscriptionEventDto.inscription.registeredAt!)

            const [inscriptionDb, created] = await InscriptionSequelize.findOrCreate({
                where: {
                    uuid: inscriptionEventDto.inscription.uuid
                },
                defaults: {
                    uuid: inscriptionEventDto.inscription.uuid,
                    studentUuid: inscriptionEventDto.inscription.studentUuid,
                    programUuid: inscriptionEventDto.inscription.academicProgram!.programUuid,
                    programVersionUuid: inscriptionEventDto.inscription.academicProgram!.programVersionUuid,
                    eventReceivingQueueUuid: inscriptionEventDto.uuid,
                    institutionAbbreviation: inscriptionEventDto.inscription.institutionAbbreviation!,
                    modality: inscriptionEventDto.inscription.modality!,
                    status: inscriptionEventDto.inscription.status!,
                    lang: inscriptionEventDto.inscription.contentLanguage!,
                    registeredAt: inscriptionEventDto.inscription.registeredAt!,
                    introductoryModule: inscriptionEventDto.inscription.introductoryModule?.academicElementUuid,
                    programStartedAt: inscriptionEventDto.inscription.programStartedAt!,
                    programFinishedAt: inscriptionEventDto.inscription.programFinishedAt!,
                    extensionFinishedAt: inscriptionEventDto.inscription.extensionFinishedAt!,
                    processWhen: processWhen,
                    processed: false
                }
            })
            if (!created) {
                inscriptionDb.uuid = inscriptionEventDto.inscription.uuid
                inscriptionDb.studentUuid = inscriptionEventDto.inscription.studentUuid
                inscriptionDb.programUuid = inscriptionEventDto.inscription.academicProgram!.programUuid
                inscriptionDb.programVersionUuid = inscriptionEventDto.inscription.academicProgram!.programVersionUuid
                inscriptionDb.eventReceivingQueueUuid = inscriptionEventDto.uuid
                inscriptionDb.institutionAbbreviation = inscriptionEventDto.inscription.institutionAbbreviation!
                inscriptionDb.modality = inscriptionEventDto.inscription.modality!
                inscriptionDb.introductoryModule = inscriptionEventDto.inscription.introductoryModule?.academicElementUuid
                inscriptionDb.status = inscriptionEventDto.inscription.status!
                inscriptionDb.lang = inscriptionEventDto.inscription.contentLanguage!
                inscriptionDb.registeredAt = inscriptionEventDto.inscription.registeredAt!
                inscriptionDb.programStartedAt = inscriptionEventDto.inscription.programStartedAt!
                inscriptionDb.programFinishedAt = inscriptionEventDto.inscription.programFinishedAt!
                inscriptionDb.extensionFinishedAt = inscriptionEventDto.inscription.extensionFinishedAt!
                inscriptionDb.processWhen = processWhen
                inscriptionDb.processed = false
                await inscriptionDb.save()
                console.log("Inscription record found, update applied instead...")
            }

            return InscriptionEntity.fromRow(inscriptionDb)
        }catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async getByUuid(uuid: string): Promise<InscriptionEntity | null> {
        try {
            const inscriptionDb = await InscriptionSequelize.findOne({
                where: {
                    uuid: uuid
                }
            })
            if (!inscriptionDb) return null
            return InscriptionEntity.fromRow(inscriptionDb)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async updateByEntity(inscriptionEntity: InscriptionEntity): Promise<InscriptionEntity> {
        try {
            
            await InscriptionSequelize.update(inscriptionEntity,{
                where: {
                    uuid: inscriptionEntity.uuid
                }
            })

            return inscriptionEntity
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async getAcademicRecords(): Promise<AcademicRecordEntity[]> {
        try {
            const academicRecords:AcademicRecordEntity[] = []
            const inscriptions = await InscriptionSequelize.findAll()
            for (const inscription of inscriptions) {
                const degrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscription.uuid)
                
                if (degrees.length == 0) {
                    continue
                }
                inscription.degrees = degrees
                inscription.enrollments = await new EnrollmentDatasourceImpl().getByInscriptionUuid(inscription.uuid)
                if (inscription.enrollments.length > 0) {
                    for (const enrollment of inscription.enrollments) {
                        enrollment.academicSelections = await new AcademicSelectionDatasourceImpl().getByEnrollmentUuid(enrollment.uuid)
                    }
                }
                academicRecords.push(new AcademicRecordEntity(InscriptionEntity.fromRow(inscription)))
            }
            return academicRecords
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async getAcademicRecordByUuid(uuid: string): Promise<AcademicRecordEntity | null> {
        try {
            const inscription = await InscriptionSequelize.findOne({
                where: {
                    uuid
                }
            })
            if (!inscription) return null
            const degrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscription.uuid)
            inscription.degrees = degrees
            inscription.enrollments = await new EnrollmentDatasourceImpl().getByInscriptionUuid(inscription.uuid)
            if (inscription.enrollments.length > 0) {
                for (const enrollment of inscription.enrollments) {
                    enrollment.academicSelections = await new AcademicSelectionDatasourceImpl().getByEnrollmentUuid(enrollment.uuid)
                }
            }
            return new AcademicRecordEntity(InscriptionEntity.fromRow(inscription))
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
    
    async getNotProcessedAfterNow(): Promise<AcademicRecordEntity[]> {
        try {
            const academicRecords:AcademicRecordEntity[] = []
            const inscriptions = await InscriptionSequelize.findAll({
                where: {
                    processWhen: {
                        [Op.lt]: new Date(),
                    },
                    processed: false
                }
            })
            
            for (const inscription of inscriptions) {
                const degrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscription.uuid)
                if (degrees.length == 0) {
                    continue
                }
                inscription.degrees = degrees
                inscription.enrollments = await new EnrollmentDatasourceImpl().getByInscriptionUuid(inscription.uuid)
                if (inscription.enrollments.length > 0) {
                    for (const enrollment of inscription.enrollments) {
                        enrollment.academicSelections = await new AcademicSelectionDatasourceImpl().getByEnrollmentUuid(enrollment.uuid)
                    }
                }
                academicRecords.push(new AcademicRecordEntity(InscriptionEntity.fromRow(inscription)))
            }
            return academicRecords
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async setAcademicRecordNotProcessed(academicRecordEntity: AcademicRecordEntity): Promise<AcademicRecordEntity> {
        try {
            academicRecordEntity.inscription.processed = false
            await this.updateByEntity(academicRecordEntity.inscription)

            return academicRecordEntity
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async setAcademicRecordPrcessed(academicRecordEntity: AcademicRecordEntity): Promise<AcademicRecordEntity> {
        try {
            academicRecordEntity.inscription.processed = true
            await this.updateByEntity(academicRecordEntity.inscription)

            return academicRecordEntity
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}