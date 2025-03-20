import ProgramOfferedDatasource from "@/domain/datasources/programOfferd.datasource";
import { CustomError } from "@/domain/errors/custom.error";
import { AcademicPeriodSequelize } from "../database/models";
import ProgramOfferedAcademicPeriodEventDto from "@/domain/dtos/programOffered/programOfferedAcademicPeriod.event.dto";
import AcademicPeriodEntity from "@/domain/entity/academicPeriod.entity";

export default class ProgramOfferedDatasourceImpl implements ProgramOfferedDatasource {
    async createUpdate(programOffered: ProgramOfferedAcademicPeriodEventDto): Promise<AcademicPeriodEntity> {
        try {
            const [academicPeriod, created] = await AcademicPeriodSequelize.findOrCreate({
                where: {
                    uuid: programOffered.uuid
                },
                defaults: {
                    uuid: programOffered.uuid,
                    name: programOffered.namePeriod,
                    startDate: programOffered.startDate,
                    endDate: programOffered.endDate
                }
            })
            if (!created) {
                academicPeriod.uuid = programOffered.uuid
                academicPeriod.name = programOffered.namePeriod
                academicPeriod.startDate = programOffered.startDate
                academicPeriod.endDate = programOffered.endDate
            }

            return AcademicPeriodEntity.fromRow(academicPeriod)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async findByUuid(uuid: string): Promise<AcademicPeriodEntity | undefined> {
        try {
            const period = await AcademicPeriodSequelize.findOne({
                where: {
                    uuid: uuid
                }
            })
            if (!period) return undefined
            return AcademicPeriodEntity.fromRow(period)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}