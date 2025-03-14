import RabbitProcessorDatasource from "@/domain/datasources/rabbitProcessor.datasource";
import { CustomError } from "@/domain/errors/custom.error";
import { RabbitMQMessageDto } from "rabbitmq-resilience";

export default class RabbitProcessorDatasourceImpl implements RabbitProcessorDatasource {
    InscriptioRegisteredProcessor(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    AcademicSelectionAssociated(message: RabbitMQMessageDto): Promise<void> {
        try {
            throw CustomError.notFound('Not found error: ' + message);
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
        throw new Error("Method not implemented.");
    }
    DegreeWithdrawn(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    EnrollmentDiscarded(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    EnrollmentGenerated(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
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