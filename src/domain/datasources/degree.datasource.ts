import DegreeEventDto from "../dtos/degree/degree.event.dto";
import DegreeEntity from "../entity/degree.entity";

export default abstract class DegreeDatasource {
    abstract createUpdate(degreeEventDto:DegreeEventDto): Promise<DegreeEntity>;
}