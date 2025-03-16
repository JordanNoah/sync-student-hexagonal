import DegreeDatasource from "@/domain/datasources/degree.datasource";
import DegreeEventDto from "@/domain/dtos/degree/degree.event.dto";
import DegreeEntity from "@/domain/entity/degree.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { DegreeSequelize } from "../database/models";

export default class DegreeDatasourceImpl implements DegreeDatasource {
    async createUpdate(degreeEventDto: DegreeEventDto): Promise<DegreeEntity> {
        try {
            const [degree, created] = await DegreeSequelize.findOrCreate({
                where: {
                    uuid: degreeEventDto.degree.uuid
                },
                defaults: {
                    inscriptionUuid: degreeEventDto.degree.inscriptionUuid,
                    instituionComing: degreeEventDto.degree.institution!,
                    uuid: degreeEventDto.degree.uuid,
                }
            })

            if (!created){
                degree.uuid = degreeEventDto.degree.uuid
                degree.instituionComing = degreeEventDto.degree.institution!
                degree.inscriptionUuid = degreeEventDto.degree.inscriptionUuid
                await degree.save()
                console.log("Degree record found, update applied instead...")
            }

            return DegreeEntity.fromRow(degree)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}