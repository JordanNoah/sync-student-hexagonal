import AcademicSelectionDatasource from "@/domain/datasources/academicSelection.datasource";
import AcademicSelectionEventDto from "@/domain/dtos/academicSelection/academicSelection.event.dto";
import AcademicSelectionEntity from "@/domain/entity/academicSelection.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { AcademicSelectionSequelize } from "../database/models";
import { addMinutes } from "@/shared/utils";

export default class AcademicSelectionDatasourceImpl implements AcademicSelectionDatasource {
    async createUpdate(academicSelectionEventDto: AcademicSelectionEventDto): Promise<AcademicSelectionEntity> {
        try {
            const [academicSelectionDb, created] = await AcademicSelectionSequelize.findOrCreate({
                where: {
                    uuid: academicSelectionEventDto.academicSelection.uuid
                },
                defaults: {
                    uuid: academicSelectionEventDto.academicSelection.uuid,
                    academicElementUuid: academicSelectionEventDto.academicSelection.academicElementUuid,
                    enrollmentUuid: academicSelectionEventDto.academicSelection.enrollmentUuid,
                    callUuid: academicSelectionEventDto.academicSelection.call?.uuid,
                    startedAt: academicSelectionEventDto.academicSelection.startedAt,
                    finishedAt: academicSelectionEventDto.academicSelection.finishedAt
                }
            })

            if (!created) {
                academicSelectionDb.uuid = academicSelectionEventDto.academicSelection.uuid
                academicSelectionDb.academicElementUuid = academicSelectionEventDto.academicSelection.academicElementUuid
                academicSelectionDb.enrollmentUuid = academicSelectionEventDto.academicSelection.enrollmentUuid
                academicSelectionDb.callUuid = academicSelectionEventDto.academicSelection.call?.uuid
                academicSelectionDb.startedAt = academicSelectionEventDto.academicSelection.startedAt
                academicSelectionDb.finishedAt = academicSelectionEventDto.academicSelection.finishedAt
                await academicSelectionDb.save()
                console.log("AcademicSelection record found, update applied instead...")
            }

            return AcademicSelectionEntity.fromRow(academicSelectionDb)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}