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
import MoodleDatasourceImpl from "./moodle.datasource.impl";
import DegreeEntity from "@/domain/entity/degree.entity";
import InstitutionDatasourceImpl from "./institution.datasource.impl";
import CronProcessorDatasourceImpl from "./cronProcessor.datasource.impl";
import EducationalSynchroDatasourceImpl from "./educationalSynchro.datasource.impl";
import StudentToMoodleDto from "@/domain/dtos/moodle/student.moodle.dto";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import StudentSynchronizedDto from "@/domain/dtos/rabbitmq/studentSynchronized.dto";
import RabbitMqPublisher from "../rabbitmq/publisher";
import StudentEnrolledDto from "@/domain/dtos/rabbitmq/studentEnrolled.dto";

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

            const enrollment = await new EnrollmentDatasourceImpl().getByUuid(academicSelection!.academicSelection.enrollmentUuid);
            if (enrollment) {
                const inscription = await new InscriptionDatasourceImpl().getByUuid(enrollment.inscriptionUuid);
                if (inscription) {
                    inscription.processed = false;
                    await new InscriptionDatasourceImpl().updateByEntity(inscription);
                }
            }
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
            const academicSelectionEntity = await new AcademicSelectionDatasourceImpl().getByUuid(academicSelectionDto!.academicSelection.uuid);

            if (!academicSelectionEntity) {
                throw CustomError.notFound(`AcademicSelection with uuid ${academicSelectionDto!.uuid} not found`)
            }

            
            await new MoodleDatasourceImpl().discardAcademicSelection(academicSelectionEntity);

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

            const enrollment = await new EnrollmentDatasourceImpl().getByUuid(academicSelection!.academicSelection.enrollmentUuid);
            if (enrollment) {
                const inscription = await new InscriptionDatasourceImpl().getByUuid(enrollment.inscriptionUuid);
                if (inscription) {
                    inscription.processed = false;
                    await new InscriptionDatasourceImpl().updateByEntity(inscription);
                }
            }
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

            let oldDegrees: DegreeEntity[] = []

            const inscription = await new InscriptionDatasourceImpl().getByUuid(degreeEventDto!.degree.inscriptionUuid);
            if (inscription && inscription.processed) {
                oldDegrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscription.uuid);
            }

            await new DegreeDatasourceImpl().deleteById(degreeEntity.id);


            if (inscription && inscription.processed) {
                const newDegrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscription.uuid);
                const actualInstitution = await new InstitutionDatasourceImpl().getByDegrees(oldDegrees);
                const newInstitution = await new InstitutionDatasourceImpl().getByDegrees(newDegrees);

                if(actualInstitution?.abbreviation !== newInstitution?.abbreviation) {
                    const student = await new MoodleDatasourceImpl().syncStudent(inscription.studentUuid, actualInstitution!)
                    const academicRecord = await new InscriptionDatasourceImpl().getAcademicRecordByUuid(inscription.uuid)
                    //desenrollar de moodle viejo 
                    if (academicRecord) {
                        const courseUuid = await new MoodleDatasourceImpl().getListOfCourses(academicRecord)
                        const courseUuidDto = await new EducationalSynchroDatasourceImpl().getCourses(courseUuid,actualInstitution!)
                        if(courseUuidDto.missingCourse.length > 0) {
                            //TO DO enviar correo
                        }
                        if (courseUuidDto.existingCourses.length > 0) {
                            await new MoodleDatasourceImpl().unenrollStudent(student, actualInstitution!,courseUuidDto.existingCourses)
                            inscription.processed = false
                            await new InscriptionDatasourceImpl().updateByEntity(inscription)
                        }
                        //enrollar en moodle nuevo

                        if (newInstitution && newInstitution.active){
                            const programCourse = courseUuidDto.existingCourses.find(course => course.uuid === academicRecord.inscription.programVersionUuid)
                            if (programCourse) {

                                if(!student.isCreated && (academicRecord.inscription.enrollments && academicRecord.inscription.enrollments.length > 0)) {
                                    // todo masive unenroll
                                    await new MoodleDatasourceImpl().unenrollStudent(student, newInstitution, courseUuidDto.existingCourses)
                                }
                            
                                await new MoodleDatasourceImpl().courseEnrolments(courseUuidDto.existingCourses, courseUuid, student, newInstitution)
                            
                                const basicGroups = new MoodleDatasourceImpl().getListBasicGroups(courseUuidDto.existingCourses, academicRecord.inscription, academicRecord.inscription.degrees!, courseUuid, programCourse)
                            
                                const eduGroups = await new EducationalSynchroDatasourceImpl().getGroups(basicGroups)
                            
                                if (eduGroups.missingGroups.length > 0) {
                                    const createGroups = await new EducationalSynchroDatasourceImpl().createGroups(eduGroups.missingGroups, newInstitution, courseUuidDto.existingCourses)
                                    eduGroups.existGroups.push(...createGroups)
                                }
                            
                                await new MoodleDatasourceImpl().assingGroups(eduGroups.existGroups, newInstitution, student)
                            
                                //actualizar todo a hecho en db
                                await new InscriptionDatasourceImpl().setAcademicRecordPrcessed(academicRecord)
                            }
                        }
                    }
                }
            }
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

            let oldDegrees: DegreeEntity[] = []

            const inscription = await new InscriptionDatasourceImpl().getByUuid(degreeEventDto!.degree.inscriptionUuid);
            if (inscription && inscription.processed) {
                oldDegrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscription.uuid);
            }

            const newDegree = await new DegreeDatasourceImpl().createUpdate(degreeEventDto!);

            if (oldDegrees.length > 0) {
                const actualInstitution = await new InstitutionDatasourceImpl().getByDegrees(oldDegrees);
                const newInstitution = await new InstitutionDatasourceImpl().getByDegrees([newDegree, ...oldDegrees]);
                if(actualInstitution?.abbreviation !== newInstitution?.abbreviation) {
                    const inscription = await new InscriptionDatasourceImpl().getByUuid(newDegree.inscriptionUuid);
                    if (inscription) {
                        const student = await new MoodleDatasourceImpl().syncStudent(inscription.studentUuid, actualInstitution!)
                        const academicRecord = await new InscriptionDatasourceImpl().getAcademicRecordByUuid(inscription.uuid)
                        //desenrollar de moodle viejo 
                        if (academicRecord) {
                            const courseUuid = await new MoodleDatasourceImpl().getListOfCourses(academicRecord)
                            const courseUuidDto = await new EducationalSynchroDatasourceImpl().getCourses(courseUuid,actualInstitution!)
                            if(courseUuidDto.missingCourse.length > 0) {
                                //TO DO enviar correo
                            }

                            if (courseUuidDto.existingCourses.length > 0) {
                                await new MoodleDatasourceImpl().unenrollStudent(student, actualInstitution!,courseUuidDto.existingCourses)
                                inscription.processed = false
                                await new InscriptionDatasourceImpl().updateByEntity(inscription)
                            }
                            //enrollar en moodle nuevo
                        }
                    }
                }
            }

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

            let oldDegrees: DegreeEntity[] = []

            const inscription = await new InscriptionDatasourceImpl().getByUuid(degreeEventDto!.degree.inscriptionUuid);
            if (inscription && inscription.processed) {
                oldDegrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscription.uuid);
            }

            await new DegreeDatasourceImpl().deleteById(degreeEntity.id);


            if (inscription && inscription.processed) {
                const newDegrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscription.uuid);
                const actualInstitution = await new InstitutionDatasourceImpl().getByDegrees(oldDegrees);
                const newInstitution = await new InstitutionDatasourceImpl().getByDegrees(newDegrees);

                if(actualInstitution?.abbreviation !== newInstitution?.abbreviation) {
                    const student = await new MoodleDatasourceImpl().syncStudent(inscription.studentUuid, actualInstitution!)
                    const academicRecord = await new InscriptionDatasourceImpl().getAcademicRecordByUuid(inscription.uuid)
                    //desenrollar de moodle viejo 
                    if (academicRecord) {
                        const courseUuid = await new MoodleDatasourceImpl().getListOfCourses(academicRecord)
                        const courseUuidDto = await new EducationalSynchroDatasourceImpl().getCourses(courseUuid,actualInstitution!)
                        if(courseUuidDto.missingCourse.length > 0) {
                            //TO DO enviar correo
                        }
                        if (courseUuidDto.existingCourses.length > 0) {
                            await new MoodleDatasourceImpl().unenrollStudent(student, actualInstitution!,courseUuidDto.existingCourses)
                            inscription.processed = false
                            await new InscriptionDatasourceImpl().updateByEntity(inscription)
                        }
                        //enrollar en moodle nuevo
                    }
                }
            }
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
            inscriptionEntity.processed = false;
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
            inscriptionEntity.processed = false;
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

            const degrees = await new DegreeDatasourceImpl().getByInscriptionUuid(inscriptionEntity.uuid);
            const institution = await new InstitutionDatasourceImpl().getByDegrees(degrees);
            if(inscriptionEntity.processed && degrees.length > 0){
                //curso compartido
            }
            
            inscriptionEntity.processed = true;
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
            inscriptionEntity.processed = false;
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
            inscriptionEntity.processed = false;
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
                await new ProgramOfferedDatasourceImpl().createUpdate(offer);
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
            inscriptionEntity.processed = false;
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
            inscriptionEntity.processed = false;
            await new InscriptionDatasourceImpl().updateByEntity(inscriptionEntity);
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
    async StudentSynchronized(academicRecord: AcademicRecordEntity): Promise<void> {
        try {            
            const [error, eventDto] = StudentSynchronizedDto.create(academicRecord);
            if (error) {
                throw CustomError.internalServer(error)
            }
            
            await new RabbitMqPublisher().publishStudentSynchronized(eventDto!)
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }

    async StudentEnrolled(academicRecord: AcademicRecordEntity): Promise<void> {
        try {            
            const [error, eventDto] = StudentEnrolledDto.create(academicRecord);
            if (error) {
                throw CustomError.internalServer(error)
            }
            
            await new RabbitMqPublisher().publishStudentEnrolled(eventDto!)
        } catch (error) {
            return CustomError.throwAnError(error) ?? Promise.resolve();
        }
    }
}