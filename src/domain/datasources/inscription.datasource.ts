export default abstract class InscriptionDatasource {
    abstract createUpdate(): Promise<void>;
    
}