import InscriptionRepository from "@/domain/repository/inscription.repository";
import InscriptionDatasourceImpl from "../datasources/inscription.datasource.impl";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";

export default class InscriptionRepositoryImpl implements InscriptionRepository {
    private readonly inscriptionDatasource: InscriptionDatasourceImpl;
    constructor(){
        this.inscriptionDatasource = new InscriptionDatasourceImpl();
    }

    async getAcademicRecords(): Promise<AcademicRecordEntity[]> {
        return this.inscriptionDatasource.getAcademicRecords();
    }

    async getAcademicRecordByUuid(uuid: string): Promise<AcademicRecordEntity | null> {
        return this.inscriptionDatasource.getAcademicRecordByUuid(uuid);
    }
}