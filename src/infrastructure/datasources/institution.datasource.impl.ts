import InstitutionDatasource from "@/domain/datasources/institution.datasource";
import DegreeEntity from "@/domain/entity/degree.entity";
import InstitutionEntity from "@/domain/entity/institution.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { InstitutionSequelize } from "../database/models";
import InstitutionDto from "@/domain/dtos/institution/institution.dto";

export default class InstitutionDatasourceImpl implements InstitutionDatasource {
    async getByAbbreviation(abbreviation: string): Promise<InstitutionEntity | null> {
        try {
            const institutionDb = await InstitutionSequelize.findOne({
                where: {
                    abbreviation: abbreviation
                }
            })
            if (!institutionDb) return null

            return InstitutionEntity.fromRow(institutionDb);
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
    async getByDegrees(degrees: DegreeEntity[]): Promise<InstitutionEntity | null> {
        try {
            let institutionEntity: InstitutionEntity | null = null
            for (const degree of degrees) {                
                const institution = await this.getByAbbreviation(degree.instituionComing);
                if (institution){
                    degree.institution = institution;
                    if (institution.abbreviation.toUpperCase() === "UNIB") {
                        institutionEntity = institution;
                        break;
                    }
                    if (institution.parent) {
                        const parent = await this.getById(institution.parent);
                        if (parent) {
                            institutionEntity = parent;
                        }
                    }
                }
            }
            return institutionEntity;
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
    async getById(id: number): Promise<InstitutionEntity | null> {
        try {
            let institutionDb = await InstitutionSequelize.findOne({
                where: {
                    id: id
                }
            })

            if (!institutionDb) { return null }

            return InstitutionEntity.fromRow(institutionDb);
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
    async register(institutionDto: InstitutionDto): Promise<InstitutionEntity> {
        try {
            const [institutionDb, created] = await InstitutionSequelize.findOrCreate({
                defaults: {
                    uuid: institutionDto.uuid,
                    name: institutionDto.name,
                    fullName: institutionDto.fullName,
                    abbreviation: institutionDto.abbreviation,
                    domain: institutionDto.domain,
                    website: institutionDto.website,
                    restPath: institutionDto.restPath,
                    modality: institutionDto.modality,
                    translation: institutionDto.translations,
                    token: institutionDto.token,
                    active: institutionDto.active,
                    parent: institutionDto.parent
                },
                where: {
                    name: institutionDto.name,
                    abbreviation: institutionDto.abbreviation
                }
            })

            if (!created) console.log("Institution record found, creation is not required...")

            return InstitutionEntity.fromRow(institutionDb);
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}