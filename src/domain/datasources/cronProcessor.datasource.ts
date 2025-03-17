import AcademicRecordEntity from "../entity/academicRecord.entity";
import AcademicSelectionEntity from "../entity/academicSelection.entity";
import InstitutionEntity from "../entity/institution.entity";

export default abstract class CronProcessorDatasource {
    abstract processInscriptions(): Promise<void>
    abstract processAcademicSelections(): Promise<void>
    abstract getListOfCourses(academicRecord:AcademicRecordEntity, institution:InstitutionEntity): any[]
    abstract getAcademicPeriodString(academicSelection:AcademicSelectionEntity): string | undefined
}