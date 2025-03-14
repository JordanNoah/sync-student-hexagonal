import InscriptionDatasource from "@/domain/datasources/inscription.datasource";
import InscriptionEventDto from "@/domain/dtos/inscription/inscription.event.dto";
import { CustomError } from "@/domain/errors/custom.error";
import { InscriptionSequelize } from "../database/models";
import { addMinutes } from "@/shared/utils";
import InscriptionEntity from "@/domain/entity/inscription.entity";

export default class InscriptionDatasourceImpl implements InscriptionDatasource {
    async createUpdate(inscriptionEventDto: InscriptionEventDto): Promise<InscriptionEntity> {
        try {
            const processWhen = addMinutes(inscriptionEventDto.inscription.registeredAt)

            const [inscriptionDb, created] = await InscriptionSequelize.findOrCreate({
                where: {
                    uuid: inscriptionEventDto.inscription.uuid
                },
                defaults: {
                    uuid: inscriptionEventDto.inscription.uuid,
                    studentUuid: inscriptionEventDto.inscription.studentUuid,
                    programUuid: inscriptionEventDto.inscription.academicProgram.programUuid,
                    programVersionUuid: inscriptionEventDto.inscription.academicProgram.programVersionUuid,
                    eventReceivingQueueUuid: inscriptionEventDto.uuid,
                    institutionAbbreviation: inscriptionEventDto.inscription.institutionAbbreviation,
                    modality: inscriptionEventDto.inscription.modality,
                    status: inscriptionEventDto.inscription.status,
                    lang: inscriptionEventDto.inscription.contentLanguage,
                    registeredAt: inscriptionEventDto.inscription.registeredAt,
                    introductoryModule: inscriptionEventDto.inscription.introductoryModule?.academicElementUuid,
                    programStartedAt: inscriptionEventDto.inscription.programStartedAt,
                    programFinishedAt: inscriptionEventDto.inscription.programFinishedAt,
                    extensionFinishedAt: inscriptionEventDto.inscription.extensionFinishedAt,
                    processWhen: processWhen,
                    processed: false
                }
            })
            if (!created) {
                inscriptionDb.uuid = inscriptionEventDto.inscription.uuid
                inscriptionDb.studentUuid = inscriptionEventDto.inscription.studentUuid
                inscriptionDb.programUuid = inscriptionEventDto.inscription.academicProgram.programUuid
                inscriptionDb.programVersionUuid = inscriptionEventDto.inscription.academicProgram.programVersionUuid
                inscriptionDb.eventReceivingQueueUuid = inscriptionEventDto.uuid
                inscriptionDb.institutionAbbreviation = inscriptionEventDto.inscription.institutionAbbreviation
                inscriptionDb.modality = inscriptionEventDto.inscription.modality
                inscriptionDb.introductoryModule = inscriptionEventDto.inscription.introductoryModule?.academicElementUuid
                inscriptionDb.status = inscriptionEventDto.inscription.status
                inscriptionDb.lang = inscriptionEventDto.inscription.contentLanguage
                inscriptionDb.registeredAt = inscriptionEventDto.inscription.registeredAt
                inscriptionDb.programStartedAt = inscriptionEventDto.inscription.programStartedAt
                inscriptionDb.programFinishedAt = inscriptionEventDto.inscription.programFinishedAt
                inscriptionDb.extensionFinishedAt = inscriptionEventDto.inscription.extensionFinishedAt
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
}