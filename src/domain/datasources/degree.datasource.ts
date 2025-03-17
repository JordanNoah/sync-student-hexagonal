import DegreeEventDto from "../dtos/degree/degree.event.dto";
import DegreeEntity from "../entity/degree.entity";

export default abstract class DegreeDatasource {
    abstract createUpdate(degreeEventDto:DegreeEventDto): Promise<DegreeEntity>;
    abstract getByUuid(uuid: string): Promise<DegreeEntity | null>;
    abstract deleteById(id: number): Promise<void>;
    abstract getByInscriptionUuid(inscriptionUuid: string): Promise<DegreeEntity[]>
}