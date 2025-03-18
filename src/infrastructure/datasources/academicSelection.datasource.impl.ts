import AcademicSelectionDatasource from "@/domain/datasources/academicSelection.datasource";
import AcademicSelectionEventDto from "@/domain/dtos/academicSelection/academicSelection.event.dto";
import AcademicSelectionEntity from "@/domain/entity/academicSelection.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { AcademicSelectionSequelize } from "../database/models";
import { addMinutes } from "@/shared/utils";
import { Op } from "sequelize";

export default class AcademicSelectionDatasourceImpl implements AcademicSelectionDatasource {
    async createUpdate(academicSelectionEventDto: AcademicSelectionEventDto): Promise<AcademicSelectionEntity> {
        try {
            const [academicSelectionDb, created] = await AcademicSelectionSequelize.findOrCreate({
                where: {
                    uuid: academicSelectionEventDto.academicSelection.uuid
                },
                defaults: {
                    uuid: academicSelectionEventDto.academicSelection.uuid,
                    academicElementUuid: academicSelectionEventDto.academicSelection.academicElementUuid!,
                    enrollmentUuid: academicSelectionEventDto.academicSelection.enrollmentUuid,
                    callUuid: academicSelectionEventDto.academicSelection.call?.uuid,
                    startedAt: academicSelectionEventDto.academicSelection.startedAt,
                    finishedAt: academicSelectionEventDto.academicSelection.finishedAt
                }
            })

            if (!created) {
                academicSelectionDb.uuid = academicSelectionEventDto.academicSelection.uuid
                academicSelectionDb.academicElementUuid = academicSelectionEventDto.academicSelection.academicElementUuid!
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

    async getByUuid(uuid: string): Promise<AcademicSelectionEntity | null> {
        try {
            const academicSelectionDb = await AcademicSelectionSequelize.findOne({
                where: {
                    uuid: uuid
                }
            })
            if (!academicSelectionDb) {
                return null
            }
            return AcademicSelectionEntity.fromRow(academicSelectionDb)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async deleteById(id: number): Promise<void> {
        try {
            await AcademicSelectionSequelize.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async getByEnrollmentUuid(enrollmentUuid: string): Promise<AcademicSelectionEntity[]> {
        try {
            const academicSelections = await AcademicSelectionSequelize.findAll({
                where: {
                    enrollmentUuid: enrollmentUuid
                }
            })
            
            return academicSelections.map(academicSelection => AcademicSelectionEntity.fromRow(academicSelection))
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async setAcademicSelectionNotProcessed(academicSelectionEntity: AcademicSelectionEntity[]): Promise<AcademicSelectionEntity[]> {
        try {
            await AcademicSelectionSequelize.update({
                processedAt: null
            }, {
                where:{
                    id: {
                        [Op.in]: academicSelectionEntity.map(academicSelection => academicSelection.id)
                    }
                }
            })
            return academicSelectionEntity
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async setAcademicSelectionProcessed(academicSelectionEntity: AcademicSelectionEntity[]): Promise<AcademicSelectionEntity[]> {
        try {
            await AcademicSelectionSequelize.update({
                processedAt: new Date()
            }, {
                where:{
                    id: {
                        [Op.in]: academicSelectionEntity.map(academicSelection => academicSelection.id)
                    }
                }
            })
            return academicSelectionEntity
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}