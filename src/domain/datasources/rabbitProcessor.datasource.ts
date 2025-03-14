import {RabbitMQMessageDto} from 'rabbitmq-resilience'
export default abstract class RabbitProcessorDatasource {
    abstract InscriptioRegisteredProcessor(message:RabbitMQMessageDto): Promise<void>;
    abstract RegistrationDateEstablished(message:RabbitMQMessageDto): Promise<void>;
    abstract ProgramStartDateEstablished(message:RabbitMQMessageDto): Promise<void>;
    abstract ProgramEndDateEstablished(message:RabbitMQMessageDto): Promise<void>;
    abstract ExtensionEndDateEstablished(message:RabbitMQMessageDto): Promise<void>;
    abstract InscriptionActivated(message:RabbitMQMessageDto): Promise<void>;
    abstract InscriptionWithdrawn(message:RabbitMQMessageDto): Promise<void>;
    abstract EnrollmentGenerated(message:RabbitMQMessageDto): Promise<void>;
    abstract EnrollmentDiscarded(message:RabbitMQMessageDto): Promise<void>;
    abstract AcademicSelectionAssociated(message:RabbitMQMessageDto): Promise<void>;
    abstract AcademicSelectionDiscarded(message:RabbitMQMessageDto): Promise<void>;
    abstract ProgramChanged(message:RabbitMQMessageDto): Promise<void>;
    abstract AcademicSelectionScheduled(message:RabbitMQMessageDto): Promise<void>;
    abstract DegreeWithdrawn(message:RabbitMQMessageDto): Promise<void>;
    abstract DegreeDeactivated(message:RabbitMQMessageDto): Promise<void>;
    abstract DegreeRegistered(message:RabbitMQMessageDto): Promise<void>;
    abstract ProgramOffered(message:RabbitMQMessageDto): Promise<void>;
}