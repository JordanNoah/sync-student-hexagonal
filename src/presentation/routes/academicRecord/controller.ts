import InscriptionRepository from "@/domain/repository/inscription.repository";
import InscriptionRepositoryImpl from "@/infrastructure/repository/inscription.repository.impl";
import { Context } from "hono";

export default class AcademicRecordController {
    private readonly inscriptionRepository:InscriptionRepository
    constructor(){
        this.inscriptionRepository = new InscriptionRepositoryImpl()
    }

    public getAcademicRecords = async (c:Context) => {
        try {
            return c.json(await this.inscriptionRepository.getAcademicRecords())
        } catch (error) {
            return c.json({error}, 500)
        }
    }

    public getAcademicRecordByUuid = async (c:Context) => {
        try {
            const {uuid} = c.req.param()
            return c.json(await this.inscriptionRepository.getAcademicRecordByUuid(uuid))
        } catch (error) {
            return c.json({error}, 500)
        }
    }
}