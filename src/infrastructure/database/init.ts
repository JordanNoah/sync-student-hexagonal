import { CustomError } from "@/domain/errors/custom.error"
import { 
    AcademicPeriodSequelize,
    AcademicSelectionSequelize,
    DegreeSequelize,
    EnrollmentSequelize,
    InscriptionSequelize,
    InstitutionSequelize,
    MailerContentSequelize,
    MailerHistorySequelize,
    MailerNotificationSequelize,
    MailerTemplateContentSequelize,
    MailerTemplateSequelize
} from "./models"

import {InboxEventSequelize,OutboxEventSequelize,EventProcessLogSequelize} from "rabbitmq-resilience/dist/infrastructure/database/models/eventManager/index"
import { InstitutionSeederExec, MailerContentSeederExec, MailerNotificationSeederExec, MailerTemplateContentSeederExec, MailerTemplateSeederExec } from "./seeders/exec"

export const DbSequelize = async () => {
    try {
        // Code to connect to the database
        await AcademicPeriodSequelize.sync()
        await AcademicSelectionSequelize.sync()
        await DegreeSequelize.sync()
        await EnrollmentSequelize.sync()
        await InscriptionSequelize.sync()
        await InstitutionSequelize.sync()
        await MailerTemplateSequelize.sync();
        await MailerContentSequelize.sync();
        await MailerNotificationSequelize.sync();
        await MailerTemplateContentSequelize.sync();
        await MailerHistorySequelize.sync();

        await new InstitutionSeederExec().up()
        await new MailerTemplateSeederExec().up()
        await new MailerContentSeederExec().up()
        await new MailerNotificationSeederExec().up()
        await new MailerTemplateContentSeederExec().up()
    }catch (error: any) {
        throw CustomError.internalServer(error)
    }
}