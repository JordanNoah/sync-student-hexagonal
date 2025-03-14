import RabbitProcessorDatasource from "@/domain/datasources/rabbitProcessor.datasource";
import InscriptionEventDto from "@/domain/dtos/inscription/inscription.event.dto";
import { CustomError } from "@/domain/errors/custom.error";
import { RabbitMQMessageDto } from "rabbitmq-resilience";
import InscriptionDatasourceImpl from "./inscription.datasource.impl";
import EnrollmentDatasourceImpl from "./enrollment.datasource.impl";
import EnrollmentEventDto from "@/domain/dtos/enrollment/enrollment.event.dto";
import AcademicSelectionEventDto from "@/domain/dtos/academicSelection/academicSelection.event.dto";
import AcademicSelectionDatasourceImpl from "./academicSelection.datasource.impl";

export default class RabbitProcessorDatasourceImpl implements RabbitProcessorDatasource {
    async InscriptioRegisteredProcessor(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [errorInscription, inscriptionDto] = InscriptionEventDto.create(content);
            if (errorInscription) {
                throw CustomError.internalServer(errorInscription)
            }

            await new InscriptionDatasourceImpl().createUpdate(inscriptionDto!);
        } catch (error) {
            throw error
        }
    }
    async AcademicSelectionAssociated(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [errorAcademic, academicSelection] = AcademicSelectionEventDto.create(content);
            if (errorAcademic) {
                throw CustomError.internalServer(errorAcademic)
            }

            await new AcademicSelectionDatasourceImpl().createUpdate(academicSelection!);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    AcademicSelectionDiscarded(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    AcademicSelectionScheduled(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    DegreeDeactivated(message: RabbitMQMessageDto): Promise<void> {    
        throw new Error("Method not implemented.");
    }
    DegreeRegistered(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    DegreeWithdrawn(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    EnrollmentDiscarded(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async EnrollmentGenerated(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [errorInscription, enrollmentDto] = EnrollmentEventDto.create(content);
            
            if (errorInscription) {
                throw CustomError.internalServer(errorInscription)
            }

            await new EnrollmentDatasourceImpl().createUpdate(enrollmentDto!);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    ExtensionEndDateEstablished(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    InscriptionActivated(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    InscriptionWithdrawn(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    ProgramChanged(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    ProgramEndDateEstablished(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    ProgramOffered(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    ProgramStartDateEstablished(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    RegistrationDateEstablished(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
}