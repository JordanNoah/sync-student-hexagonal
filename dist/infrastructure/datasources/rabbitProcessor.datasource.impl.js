"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inscription_event_dto_1 = __importDefault(require("../../domain/dtos/inscription/inscription.event.dto"));
const custom_error_1 = require("../../domain/errors/custom.error");
const inscription_datasource_impl_1 = __importDefault(require("./inscription.datasource.impl"));
const enrollment_datasource_impl_1 = __importDefault(require("./enrollment.datasource.impl"));
const enrollment_event_dto_1 = __importDefault(require("../../domain/dtos/enrollment/enrollment.event.dto"));
const academicSelection_event_dto_1 = __importDefault(require("../../domain/dtos/academicSelection/academicSelection.event.dto"));
const academicSelection_datasource_impl_1 = __importDefault(require("./academicSelection.datasource.impl"));
const degree_event_dto_1 = __importDefault(require("../../domain/dtos/degree/degree.event.dto"));
const degree_datasource_impl_1 = __importDefault(require("./degree.datasource.impl"));
const programOffered_event_dto_1 = __importDefault(require("../../domain/dtos/programOffered/programOffered.event.dto"));
const programOffered_datasource_impl_1 = __importDefault(require("./programOffered.datasource.impl"));
const constants_1 = __importDefault(require("../../shared/constants"));
const enrollmentProgramChange_event_dto_1 = __importDefault(require("../../domain/dtos/enrollment/enrollmentProgramChange.event.dto"));
const moodle_datasource_impl_1 = __importDefault(require("./moodle.datasource.impl"));
const institution_datasource_impl_1 = __importDefault(require("./institution.datasource.impl"));
const educationalSynchro_datasource_impl_1 = __importDefault(require("./educationalSynchro.datasource.impl"));
class RabbitProcessorDatasourceImpl {
    InscriptioRegisteredProcessor(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = JSON.parse(message.content.toString());
                const [errorInscription, inscriptionDto] = inscription_event_dto_1.default.create(content);
                if (errorInscription) {
                    throw custom_error_1.CustomError.internalServer(errorInscription);
                }
                yield new inscription_datasource_impl_1.default().createUpdate(inscriptionDto);
            }
            catch (error) {
                throw error;
            }
        });
    }
    AcademicSelectionAssociated(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [errorAcademic, academicSelection] = academicSelection_event_dto_1.default.create(content);
                if (errorAcademic) {
                    throw custom_error_1.CustomError.internalServer(errorAcademic);
                }
                yield new academicSelection_datasource_impl_1.default().createUpdate(academicSelection);
                const enrollment = yield new enrollment_datasource_impl_1.default().getByUuid(academicSelection.academicSelection.enrollmentUuid);
                if (enrollment) {
                    const inscription = yield new inscription_datasource_impl_1.default().getByUuid(enrollment.inscriptionUuid);
                    if (inscription) {
                        inscription.processed = false;
                        yield new inscription_datasource_impl_1.default().updateByEntity(inscription);
                    }
                }
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    AcademicSelectionDiscarded(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [error, academicSelectionDto] = academicSelection_event_dto_1.default.changeStatus(content);
                if (error) {
                    throw custom_error_1.CustomError.internalServer(error);
                }
                const academicSelectionEntity = yield new academicSelection_datasource_impl_1.default().getByUuid(academicSelectionDto.academicSelection.uuid);
                if (!academicSelectionEntity) {
                    throw custom_error_1.CustomError.notFound(`AcademicSelection with uuid ${academicSelectionDto.uuid} not found`);
                }
                yield new moodle_datasource_impl_1.default().discardAcademicSelection(academicSelectionEntity);
                yield new academicSelection_datasource_impl_1.default().deleteById(academicSelectionEntity.id);
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    AcademicSelectionScheduled(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [errorAcademic, academicSelection] = academicSelection_event_dto_1.default.scheduled(content);
                if (errorAcademic) {
                    throw custom_error_1.CustomError.internalServer(errorAcademic);
                }
                yield new academicSelection_datasource_impl_1.default().createUpdate(academicSelection);
                const enrollment = yield new enrollment_datasource_impl_1.default().getByUuid(academicSelection.academicSelection.enrollmentUuid);
                if (enrollment) {
                    const inscription = yield new inscription_datasource_impl_1.default().getByUuid(enrollment.inscriptionUuid);
                    if (inscription) {
                        inscription.processed = false;
                        yield new inscription_datasource_impl_1.default().updateByEntity(inscription);
                    }
                }
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    DegreeDeactivated(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [error, degreeEventDto] = degree_event_dto_1.default.changeStatus(content);
                if (error) {
                    throw custom_error_1.CustomError.internalServer(error);
                }
                const degreeEntity = yield new degree_datasource_impl_1.default().getByUuid(degreeEventDto.degree.uuid);
                if (!degreeEntity) {
                    throw custom_error_1.CustomError.notFound(`Degree with uuid ${degreeEventDto.degree.uuid} not found`);
                }
                let oldDegrees = [];
                const inscription = yield new inscription_datasource_impl_1.default().getByUuid(degreeEventDto.degree.inscriptionUuid);
                if (inscription && inscription.processed) {
                    oldDegrees = yield new degree_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                }
                yield new degree_datasource_impl_1.default().deleteById(degreeEntity.id);
                if (inscription && inscription.processed) {
                    const newDegrees = yield new degree_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                    const actualInstitution = yield new institution_datasource_impl_1.default().getByDegrees(oldDegrees);
                    const newInstitution = yield new institution_datasource_impl_1.default().getByDegrees(newDegrees);
                    if ((actualInstitution === null || actualInstitution === void 0 ? void 0 : actualInstitution.abbreviation) !== (newInstitution === null || newInstitution === void 0 ? void 0 : newInstitution.abbreviation)) {
                        const student = yield new moodle_datasource_impl_1.default().syncStudent(inscription.studentUuid, actualInstitution);
                        const academicRecord = yield new inscription_datasource_impl_1.default().getAcademicRecordByUuid(inscription.uuid);
                        //desenrollar de moodle viejo 
                        if (academicRecord) {
                            const courseUuid = new moodle_datasource_impl_1.default().getListOfCourses(academicRecord);
                            const courseUuidDto = yield new educationalSynchro_datasource_impl_1.default().getCourses(courseUuid, actualInstitution);
                            if (courseUuidDto.missingCourse.length > 0) {
                                //TO DO enviar correo
                            }
                            if (courseUuidDto.existingCourses.length > 0) {
                                yield new moodle_datasource_impl_1.default().unenrollStudent(student, actualInstitution, courseUuidDto.existingCourses);
                                inscription.processed = false;
                                yield new inscription_datasource_impl_1.default().updateByEntity(inscription);
                            }
                            //enrollar en moodle nuevo
                            if (newInstitution && newInstitution.active) {
                                const programCourse = courseUuidDto.existingCourses.find(course => course.uuid === academicRecord.inscription.programVersionUuid);
                                if (programCourse) {
                                    if (!student.isCreated && (academicRecord.inscription.enrollments && academicRecord.inscription.enrollments.length > 0)) {
                                        // todo masive unenroll
                                        yield new moodle_datasource_impl_1.default().unenrollStudent(student, newInstitution, courseUuidDto.existingCourses);
                                    }
                                    yield new moodle_datasource_impl_1.default().courseEnrolments(courseUuidDto.existingCourses, courseUuid, student, newInstitution);
                                    const basicGroups = new moodle_datasource_impl_1.default().getListBasicGroups(courseUuidDto.existingCourses, academicRecord.inscription, newInstitution, courseUuidDto.existingCourses, courseUuid, programCourse);
                                    const eduGroups = yield new educationalSynchro_datasource_impl_1.default().getGroups(basicGroups);
                                    if (eduGroups.missingGroups.length > 0) {
                                        const createGroups = yield new educationalSynchro_datasource_impl_1.default().createGroups(eduGroups.missingGroups, newInstitution, courseUuidDto.existingCourses);
                                        eduGroups.existGroups.push(...createGroups);
                                    }
                                    yield new moodle_datasource_impl_1.default().assingGroups(eduGroups.existGroups, newInstitution, student);
                                    //actualizar todo a hecho en db
                                    yield new inscription_datasource_impl_1.default().setAcademicRecordPrcessed(academicRecord);
                                }
                            }
                        }
                    }
                }
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    DegreeRegistered(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [errorDegree, degreeEventDto] = degree_event_dto_1.default.create(content);
                if (errorDegree) {
                    throw custom_error_1.CustomError.internalServer(errorDegree);
                }
                let oldDegrees = [];
                const inscription = yield new inscription_datasource_impl_1.default().getByUuid(degreeEventDto.degree.inscriptionUuid);
                if (inscription && inscription.processed) {
                    oldDegrees = yield new degree_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                }
                const newDegree = yield new degree_datasource_impl_1.default().createUpdate(degreeEventDto);
                if (oldDegrees.length > 0) {
                    const actualInstitution = yield new institution_datasource_impl_1.default().getByDegrees(oldDegrees);
                    const newInstitution = yield new institution_datasource_impl_1.default().getByDegrees([newDegree, ...oldDegrees]);
                    if ((actualInstitution === null || actualInstitution === void 0 ? void 0 : actualInstitution.abbreviation) !== (newInstitution === null || newInstitution === void 0 ? void 0 : newInstitution.abbreviation)) {
                        const inscription = yield new inscription_datasource_impl_1.default().getByUuid(newDegree.inscriptionUuid);
                        if (inscription) {
                            const student = yield new moodle_datasource_impl_1.default().syncStudent(inscription.studentUuid, actualInstitution);
                            const academicRecord = yield new inscription_datasource_impl_1.default().getAcademicRecordByUuid(inscription.uuid);
                            //desenrollar de moodle viejo 
                            if (academicRecord) {
                                const courseUuid = new moodle_datasource_impl_1.default().getListOfCourses(academicRecord);
                                const courseUuidDto = yield new educationalSynchro_datasource_impl_1.default().getCourses(courseUuid, actualInstitution);
                                if (courseUuidDto.missingCourse.length > 0) {
                                    //TO DO enviar correo
                                }
                                if (courseUuidDto.existingCourses.length > 0) {
                                    yield new moodle_datasource_impl_1.default().unenrollStudent(student, actualInstitution, courseUuidDto.existingCourses);
                                    inscription.processed = false;
                                    yield new inscription_datasource_impl_1.default().updateByEntity(inscription);
                                }
                                //enrollar en moodle nuevo
                            }
                        }
                    }
                }
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    DegreeWithdrawn(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [error, degreeEventDto] = degree_event_dto_1.default.changeStatus(content);
                if (error) {
                    throw custom_error_1.CustomError.internalServer(error);
                }
                const degreeEntity = yield new degree_datasource_impl_1.default().getByUuid(degreeEventDto.degree.uuid);
                if (!degreeEntity) {
                    throw custom_error_1.CustomError.notFound(`Degree with uuid ${degreeEventDto.degree.uuid} not found`);
                }
                let oldDegrees = [];
                const inscription = yield new inscription_datasource_impl_1.default().getByUuid(degreeEventDto.degree.inscriptionUuid);
                if (inscription && inscription.processed) {
                    oldDegrees = yield new degree_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                }
                yield new degree_datasource_impl_1.default().deleteById(degreeEntity.id);
                if (inscription && inscription.processed) {
                    const newDegrees = yield new degree_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                    const actualInstitution = yield new institution_datasource_impl_1.default().getByDegrees(oldDegrees);
                    const newInstitution = yield new institution_datasource_impl_1.default().getByDegrees(newDegrees);
                    if ((actualInstitution === null || actualInstitution === void 0 ? void 0 : actualInstitution.abbreviation) !== (newInstitution === null || newInstitution === void 0 ? void 0 : newInstitution.abbreviation)) {
                        const student = yield new moodle_datasource_impl_1.default().syncStudent(inscription.studentUuid, actualInstitution);
                        const academicRecord = yield new inscription_datasource_impl_1.default().getAcademicRecordByUuid(inscription.uuid);
                        //desenrollar de moodle viejo 
                        if (academicRecord) {
                            const courseUuid = new moodle_datasource_impl_1.default().getListOfCourses(academicRecord);
                            const courseUuidDto = yield new educationalSynchro_datasource_impl_1.default().getCourses(courseUuid, actualInstitution);
                            if (courseUuidDto.missingCourse.length > 0) {
                                //TO DO enviar correo
                            }
                            if (courseUuidDto.existingCourses.length > 0) {
                                yield new moodle_datasource_impl_1.default().unenrollStudent(student, actualInstitution, courseUuidDto.existingCourses);
                                inscription.processed = false;
                                yield new inscription_datasource_impl_1.default().updateByEntity(inscription);
                            }
                            //enrollar en moodle nuevo
                        }
                    }
                }
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    EnrollmentDiscarded(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [error, enrollmentDto] = enrollment_event_dto_1.default.changeStatus(content);
                if (error) {
                    throw custom_error_1.CustomError.internalServer(error);
                }
                const enrollmentEntity = yield new enrollment_datasource_impl_1.default().getByUuid(enrollmentDto.uuid);
                if (!enrollmentEntity) {
                    throw custom_error_1.CustomError.notFound(`Enrollment with uuid ${enrollmentDto.uuid} not found`);
                }
                yield new enrollment_datasource_impl_1.default().deleteById(enrollmentEntity.id);
                //To do: remover todas las selecciones academicas
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    EnrollmentGenerated(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [errorInscription, enrollmentDto] = enrollment_event_dto_1.default.create(content);
                if (errorInscription) {
                    throw custom_error_1.CustomError.internalServer(errorInscription);
                }
                yield new enrollment_datasource_impl_1.default().createUpdate(enrollmentDto);
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    ExtensionEndDateEstablished(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [error, inscriptionDto] = inscription_event_dto_1.default.newDate(content);
                if (error) {
                    throw custom_error_1.CustomError.internalServer(error);
                }
                const inscriptionEntity = yield new inscription_datasource_impl_1.default().getByUuid(inscriptionDto.uuid);
                if (!inscriptionEntity) {
                    throw custom_error_1.CustomError.notFound(`Inscription with uuid ${inscriptionDto.uuid} not found`);
                }
                inscriptionEntity.extensionFinishedAt = inscriptionDto.inscription.newDate;
                inscriptionEntity.processed = false;
                yield new inscription_datasource_impl_1.default().updateByEntity(inscriptionEntity);
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    InscriptionActivated(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [errorInscription, inscriptionDto] = inscription_event_dto_1.default.create(content);
                if (errorInscription) {
                    throw custom_error_1.CustomError.internalServer(errorInscription);
                }
                const inscriptionEntity = yield new inscription_datasource_impl_1.default().getByUuid(inscriptionDto.uuid);
                if (!inscriptionEntity) {
                    throw custom_error_1.CustomError.notFound(`Inscription with uuid ${inscriptionDto.uuid} not found`);
                }
                inscriptionEntity.status = constants_1.default.INSCRIPTIONSTATUS.ACTIVATED;
                inscriptionEntity.processed = false;
                yield new inscription_datasource_impl_1.default().updateByEntity(inscriptionEntity);
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    InscriptionWithdrawn(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [errorInscription, inscriptionDto] = inscription_event_dto_1.default.create(content);
                if (errorInscription) {
                    throw custom_error_1.CustomError.internalServer(errorInscription);
                }
                const inscriptionEntity = yield new inscription_datasource_impl_1.default().getByUuid(inscriptionDto.uuid);
                if (!inscriptionEntity) {
                    throw custom_error_1.CustomError.notFound(`Inscription with uuid ${inscriptionDto.uuid} not found`);
                }
                inscriptionEntity.status = constants_1.default.INSCRIPTIONSTATUS.WITHDRAWN;
                const degrees = yield new degree_datasource_impl_1.default().getByInscriptionUuid(inscriptionEntity.uuid);
                const institution = yield new institution_datasource_impl_1.default().getByDegrees(degrees);
                if (inscriptionEntity.processed && degrees.length > 0) {
                    //curso compartido
                }
                inscriptionEntity.processed = true;
                yield new inscription_datasource_impl_1.default().updateByEntity(inscriptionEntity);
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    ProgramChanged(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [error, enrollmentDto] = enrollmentProgramChange_event_dto_1.default.create(content);
                if (error) {
                    throw custom_error_1.CustomError.internalServer(error);
                }
                const enrollmentEntity = yield new enrollment_datasource_impl_1.default().getByUuid(enrollmentDto.enrollment.uuid);
                if (!enrollmentEntity) {
                    throw custom_error_1.CustomError.notFound(`Enrollment with uuid ${enrollmentDto.uuid} not found`);
                }
                enrollmentEntity.programUuid = enrollmentDto.enrollment.academicProgram.newElement.programUuid;
                enrollmentEntity.programVersionUuid = enrollmentDto.enrollment.academicProgram.newElement.programVersionUuid;
                yield new enrollment_datasource_impl_1.default().updateByEntity(enrollmentEntity);
                // change in inscription too since has a program reference there
                const inscriptionEntity = yield new inscription_datasource_impl_1.default().getByUuid(enrollmentEntity.inscriptionUuid);
                if (!inscriptionEntity) {
                    throw custom_error_1.CustomError.notFound(`Inscription with uuid ${enrollmentEntity.inscriptionUuid} not found`);
                }
                inscriptionEntity.programUuid = enrollmentDto.enrollment.academicProgram.newElement.programUuid;
                inscriptionEntity.programVersionUuid = enrollmentDto.enrollment.academicProgram.newElement.programVersionUuid;
                inscriptionEntity.processed = false;
                yield new inscription_datasource_impl_1.default().updateByEntity(inscriptionEntity);
                //todo moodle change program
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    ProgramEndDateEstablished(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [error, inscriptionDto] = inscription_event_dto_1.default.newDate(content);
                if (error) {
                    throw custom_error_1.CustomError.internalServer(error);
                }
                const inscriptionEntity = yield new inscription_datasource_impl_1.default().getByUuid(inscriptionDto.uuid);
                if (!inscriptionEntity) {
                    throw custom_error_1.CustomError.notFound(`Inscription with uuid ${inscriptionDto.uuid} not found`);
                }
                inscriptionEntity.programFinishedAt = inscriptionDto.inscription.newDate;
                inscriptionEntity.processed = false;
                yield new inscription_datasource_impl_1.default().updateByEntity(inscriptionEntity);
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    ProgramOffered(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [errorProgramOfferd, programOfferedDto] = programOffered_event_dto_1.default.create(content);
                if (errorProgramOfferd) {
                    throw custom_error_1.CustomError.internalServer(errorProgramOfferd);
                }
                for (const offer of programOfferedDto.offers) {
                    yield new programOffered_datasource_impl_1.default().createUpdate(offer.academicPeriod);
                }
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    ProgramStartDateEstablished(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [error, inscriptionDto] = inscription_event_dto_1.default.newDate(content);
                if (error) {
                    throw custom_error_1.CustomError.internalServer(error);
                }
                const inscriptionEntity = yield new inscription_datasource_impl_1.default().getByUuid(inscriptionDto.uuid);
                if (!inscriptionEntity) {
                    throw custom_error_1.CustomError.notFound(`Inscription with uuid ${inscriptionDto.uuid} not found`);
                }
                inscriptionEntity.programStartedAt = inscriptionDto.inscription.newDate;
                inscriptionEntity.processed = false;
                yield new inscription_datasource_impl_1.default().updateByEntity(inscriptionEntity);
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    RegistrationDateEstablished(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                const [error, inscriptionDto] = inscription_event_dto_1.default.newDate(content);
                if (error) {
                    throw custom_error_1.CustomError.internalServer(error);
                }
                const inscriptionEntity = yield new inscription_datasource_impl_1.default().getByUuid(inscriptionDto.uuid);
                if (!inscriptionEntity) {
                    throw custom_error_1.CustomError.notFound(`Inscription with uuid ${inscriptionDto.uuid} not found`);
                }
                inscriptionEntity.registeredAt = inscriptionDto.inscription.newDate;
                inscriptionEntity.processed = false;
                yield new inscription_datasource_impl_1.default().updateByEntity(inscriptionEntity);
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
}
exports.default = RabbitProcessorDatasourceImpl;
