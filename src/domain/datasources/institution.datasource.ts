import InstitutionDto from "../dtos/institution/institution.dto";
import DegreeEntity from "../entity/degree.entity";
import InstitutionEntity from "../entity/institution.entity";

export default abstract class InstitutionDatasource {
    abstract getByDegrees(degrees: DegreeEntity[]): Promise<InstitutionEntity | null>;
    abstract getByAbbreviation(abbreviation: string): Promise<InstitutionEntity | null>;
    abstract getById(id: number): Promise<InstitutionEntity | null>;
    abstract register(institutionDto: InstitutionDto): Promise<InstitutionEntity>;
}