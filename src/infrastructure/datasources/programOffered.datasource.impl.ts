import ProgramOfferedDatasource from "@/domain/datasources/programOfferd.datasource";
import { CustomError } from "@/domain/errors/custom.error";
import { AcademicPeriodSequelize } from "../database/models";
import ProgramOfferedAcademicPeriodEventDto from "@/domain/dtos/programOffered/programOfferedAcademicPeriod.event.dto";
import AcademicPeriodEntity from "@/domain/entity/academicPeriod.entity";
import ProgramOfferedOffertEventDto from "@/domain/dtos/programOffered/programOfferedOffert.event.dto";

export default class ProgramOfferedDatasourceImpl implements ProgramOfferedDatasource {
    async createUpdate(programOffered: ProgramOfferedOffertEventDto): Promise<AcademicPeriodEntity> {
        try {
            const [academicPeriod, created] = await AcademicPeriodSequelize.findOrCreate({
                where: {
                    uuid: programOffered.uuid
                },
                defaults: {
                    uuid: programOffered.uuid,
                    name: programOffered.academicPeriod.namePeriod,
                    startDate: programOffered.academicPeriod.startDate,
                    endDate: programOffered.academicPeriod.startDate
                }
            })
            if (!created) {
                academicPeriod.uuid = programOffered.uuid
                academicPeriod.name = programOffered.academicPeriod.namePeriod
                academicPeriod.startDate = programOffered.academicPeriod.startDate
                academicPeriod.endDate = programOffered.academicPeriod.endDate
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