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
import appConstants from "@/shared/constants";
import ChangeEnrollmentAcademicProgramEventDto from "@/domain/dtos/enrollment/enrollmentProgramChange.event.dto";

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
    async AcademicSelectionDiscarded(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [error, academicSelectionDto] = AcademicSelectionEventDto.changeStatus(content);
            if (error) {
                throw CustomError.internalServer(error)
            }
            const academicSelectionEntity = await new AcademicSelectionDatasourceImpl().getByUuid(academicSelectionDto!.uuid);

            if (!academicSelectionEntity) {
                throw CustomError.notFound(`AcademicSelection with uuid ${academicSelectionDto!.uuid} not found`)
            }

            await new AcademicSelectionDatasourceImpl().deleteById(academicSelectionEntity.id);

            
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
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
    async DegreeDeactivated(message: RabbitMQMessageDto): Promise<void> {    
        try {
            const content = JSON.parse(message.content.toString());
            const [error, degreeEventDto] = DegreeEventDto.changeStatus(content);
            if (error) {
                throw CustomError.internalServer(error)
            }
            
            const degreeEntity = await new DegreeDatasourceImpl().getByUuid(degreeEventDto!.degree.uuid);
            if (!degreeEntity) {
                throw CustomError.notFound(`Degree with uuid ${degreeEventDto!.degree.uuid} not found`)
            }

            await new DegreeDatasourceImpl().deleteById(degreeEntity.id);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
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
    async DegreeWithdrawn(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [error, degreeEventDto] = DegreeEventDto.changeStatus(content);
            if (error) {
                throw CustomError.internalServer(error)
            }
            
            const degreeEntity = await new DegreeDatasourceImpl().getByUuid(degreeEventDto!.degree.uuid);
            if (!degreeEntity) {
                throw CustomError.notFound(`Degree with uuid ${degreeEventDto!.degree.uuid} not found`)
            }

            await new DegreeDatasourceImpl().deleteById(degreeEntity.id);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    async EnrollmentDiscarded(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [error, enrollmentDto] = EnrollmentEventDto.changeStatus(content);
            if (error) {
                throw CustomError.internalServer(error)
            }

            const enrollmentEntity = await new EnrollmentDatasourceImpl().getByUuid(enrollmentDto!.uuid);
            if (!enrollmentEntity) {
                throw CustomError.notFound(`Enrollment with uuid ${enrollmentDto!.uuid} not found`)
            }

            await new EnrollmentDatasourceImpl().deleteById(enrollmentEntity.id);
            //To do: remover todas las selecciones academicas
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
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
    async ExtensionEndDateEstablished(message: RabbitMQMessageDto): Promise<void> {
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

            inscriptionEntity.extensionFinishedAt = inscriptionDto!.inscription.newDate!;
            await new InscriptionDatasourceImpl().updateByEntity(inscriptionEntity);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    async InscriptionActivated(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [errorInscription, inscriptionDto] = InscriptionEventDto.create(content);
            if (errorInscription) {
                throw CustomError.internalServer(errorInscription)
            }

            const inscriptionEntity = await new InscriptionDatasourceImpl().getByUuid(inscriptionDto!.uuid);
            if (!inscriptionEntity) {
                throw CustomError.notFound(`Inscription with uuid ${inscriptionDto!.uuid} not found`)
            }

            inscriptionEntity.status = appConstants.INSCRIPTIONSTATUS.ACTIVATED;
            await new InscriptionDatasourceImpl().updateByEntity(inscriptionEntity);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    async InscriptionWithdrawn(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [errorInscription, inscriptionDto] = InscriptionEventDto.create(content);
            if (errorInscription) {
                throw CustomError.internalServer(errorInscription)
            }

            const inscriptionEntity = await new InscriptionDatasourceImpl().getByUuid(inscriptionDto!.uuid);
            if (!inscriptionEntity) {
                throw CustomError.notFound(`Inscription with uuid ${inscriptionDto!.uuid} not found`)
            }

            inscriptionEntity.status = appConstants.INSCRIPTIONSTATUS.WITHDRAWN;
            await new InscriptionDatasourceImpl().updateByEntity(inscriptionEntity);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    async ProgramChanged(message: RabbitMQMessageDto): Promise<void> {
        try {
            const content = JSON.parse(message.content.toString());
            const [error, enrollmentDto] = ChangeEnrollmentAcademicProgramEventDto.create(content);
            if (error) {
                throw CustomError.internalServer(error)
            }

            const enrollmentEntity = await new EnrollmentDatasourceImpl().getByUuid(enrollmentDto!.enrollment.uuid);
            if (!enrollmentEntity) {
                throw CustomError.notFound(`Enrollment with uuid ${enrollmentDto!.uuid} not found`)
            }
            enrollmentEntity.programUuid = enrollmentDto!.enrollment.academicProgram.newElement.programUuid
            enrollmentEntity.programVersionUuid = enrollmentDto!.enrollment.academicProgram.newElement.programVersionUuid
            await new EnrollmentDatasourceImpl().updateByEntity(enrollmentEntity);

            // change in inscription too since has a program reference there

            const inscriptionEntity = await new InscriptionDatasourceImpl().getByUuid(enrollmentEntity.inscriptionUuid);
            if (!inscriptionEntity) {
                throw CustomError.notFound(`Inscription with uuid ${enrollmentEntity.inscriptionUuid} not found`)
            }

            inscriptionEntity.programUuid = enrollmentDto!.enrollment.academicProgram.newElement.programUuid
            inscriptionEntity.programVersionUuid = enrollmentDto!.enrollment.academicProgram.newElement.programVersionUuid

            await new InscriptionDatasourceImpl().updateByEntity(inscriptionEntity);
            //todo moodle change program

        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    async ProgramEndDateEstablished(message: RabbitMQMessageDto): Promise<void> {
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

            inscriptionEntity.programFinishedAt = inscriptionDto!.inscription.newDate!;
            await new InscriptionDatasourceImpl().updateByEntity(inscriptionEntity);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
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
    async ProgramStartDateEstablished(message: RabbitMQMessageDto): Promise<void> {
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

            inscriptionEntity.programStartedAt = inscriptionDto!.inscription.newDate!;
            await new InscriptionDatasourceImpl().updateByEntity(inscriptionEntity);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
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