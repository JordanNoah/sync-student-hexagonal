import { CustomError } from "@/domain/errors/custom.error"
import { 
    AcademicPeriodSequelize,
    AcademicSelectionSequelize,
    DegreeSequelize,
    EnrollmentSequelize,
    InscriptionSequelize,
    InstitutionSequelize
} from "./models"

import {InboxEventSequelize,OutboxEventSequelize,EventProcessLogSequelize} from "rabbitmq-resilience/dist/infrastructure/database/models/eventManager/index"
import { InstitutionSeederExec } from "./seeders/exec/institution.seeder.exec"

export const DbSequelize = async () => {
    try {
        // Code to connect to the database
        await AcademicPeriodSequelize.sync()
        await AcademicSelectionSequelize.sync()
        await DegreeSequelize.sync()
        await EnrollmentSequelize.sync()
        await InscriptionSequelize.sync()
        await InstitutionSequelize.sync()

        await new InstitutionSeederExec().up()
    }catch (error: any) {
        throw CustomError.internalServer(error)
    }
}