export default abstract class CronProcessorDatasource {
    abstract processInscriptions(): Promise<void>
    abstract processAcademicSelections(): Promise<void>
}