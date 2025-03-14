import InscriptionEventDto from "../dtos/inscription/inscription.event.dto";
import InscriptionEntity from "../entity/inscription.entity";

export default abstract class InscriptionDatasource {
    abstract createUpdate(inscriptionEventDto:InscriptionEventDto): Promise<InscriptionEntity>;
}