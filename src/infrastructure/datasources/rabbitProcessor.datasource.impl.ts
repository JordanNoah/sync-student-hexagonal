import RabbitProcessorDatasource from "@/domain/datasources/rabbitProcessor.datasource";
import InscriptionEventDto from "@/domain/dtos/inscription/inscription.event.dto";
import { CustomError } from "@/domain/errors/custom.error";
import { RabbitMQMessageDto } from "rabbitmq-resilience";
import InscriptionDatasourceImpl from "./inscription.datasource.impl";
import EnrollmentDatasourceImpl from "./enrollment.datasource.impl";
import EnrollmentEventDto from "@/domain/dtos/enrollment/enrollment.event.dto";
import AcademicSelectionEventDto from "@/domain/dtos/academicSelection/academicSelection.event.dto";
import AcademicSelectionDatasourceImpl from "./academicSelection.datasource.impl";
import DegreeEventDto from "@/domain/dtos/degree/degree.event.dto";
import DegreeDatasourceImpl from "./degree.datasource.impl";
import ProgramOfferedEventDto from "@/domain/dtos/programOffered/programOffered.event.dto";
import ProgramOfferedDatasourceImpl from "./programOffered.datasource.impl";

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
    async AcademicSelectionScheduled(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [errorAcademic, academicSelection] = AcademicSelectionEventDto.scheduled(content);
            if (errorAcademic) {
                throw CustomError.internalServer(errorAcademic)
            }

            await new AcademicSelectionDatasourceImpl().createUpdate(academicSelection!);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    DegreeDeactivated(message: RabbitMQMessageDto): Promise<void> {    
        throw new Error("Method not implemented.");
    }
    async DegreeRegistered(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [errorDegree, degreeEventDto] = DegreeEventDto.create(content);
            if (errorDegree) {
                throw CustomError.internalServer(errorDegree)
            }

            await new DegreeDatasourceImpl().createUpdate(degreeEventDto!);
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
    async ProgramOffered(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [errorProgramOfferd, programOfferedDto] = ProgramOfferedEventDto.create(content);
            if (errorProgramOfferd) {
                throw CustomError.internalServer(errorProgramOfferd)
            }

            for (const offer of programOfferedDto!.offers) {
                await new ProgramOfferedDatasourceImpl().createUpdate(offer.academicPeriod);
            }
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    ProgramStartDateEstablished(message: RabbitMQMessageDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async RegistrationDateEstablished(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [error, inscriptionDto] = InscriptionEventDto.newDate(content);
            if (error) {
                throw CustomError.internalServer(error)
            }

            const inscriptionEntity = await new InscriptionDatasourceImpl().getByUuid(inscriptionDto!.uuid);
            if (!inscriptionEntity) {
                throw CustomError.notFound(`Inscription with uuid ${inscriptionDto!.uuid} not found`)
            }

            inscriptionEntity.registeredAt = inscriptionDto!.inscription.newDate!;
            await new InscriptionDatasourceImpl().updateByEntity(inscriptionEntity);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
}