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
const custom_error_1 = require("../../domain/errors/custom.error");
const models_1 = require("../database/models");
const utils_1 = require("../../shared/utils");
const inscription_entity_1 = __importDefault(require("../../domain/entity/inscription.entity"));
const academicRecord_entity_1 = __importDefault(require("../../domain/entity/academicRecord.entity"));
const degree_datasource_impl_1 = __importDefault(require("./degree.datasource.impl"));
const academicSelection_datasource_impl_1 = __importDefault(require("./academicSelection.datasource.impl"));
const enrollment_datasource_impl_1 = __importDefault(require("./enrollment.datasource.impl"));
const sequelize_1 = require("sequelize");
class InscriptionDatasourceImpl {
    createUpdate(inscriptionEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const processWhen = (0, utils_1.addMinutes)(inscriptionEventDto.inscription.registeredAt);
                const [inscriptionDb, created] = yield models_1.InscriptionSequelize.findOrCreate({
                    where: {
                        uuid: inscriptionEventDto.inscription.uuid
                    },
                    defaults: {
                        uuid: inscriptionEventDto.inscription.uuid,
                        studentUuid: inscriptionEventDto.inscription.studentUuid,
                        programUuid: inscriptionEventDto.inscription.academicProgram.programUuid,
                        programVersionUuid: inscriptionEventDto.inscription.academicProgram.programVersionUuid,
                        eventReceivingQueueUuid: inscriptionEventDto.uuid,
                        institutionAbbreviation: inscriptionEventDto.inscription.institutionAbbreviation,
                        modality: inscriptionEventDto.inscription.modality,
                        status: inscriptionEventDto.inscription.status,
                        lang: inscriptionEventDto.inscription.contentLanguage,
                        registeredAt: inscriptionEventDto.inscription.registeredAt,
                        introductoryModule: (_a = inscriptionEventDto.inscription.introductoryModule) === null || _a === void 0 ? void 0 : _a.academicElementUuid,
                        programStartedAt: inscriptionEventDto.inscription.programStartedAt,
                        programFinishedAt: inscriptionEventDto.inscription.programFinishedAt,
                        extensionFinishedAt: inscriptionEventDto.inscription.extensionFinishedAt,
                        processWhen: processWhen,
                        processed: false
                    }
                });
                if (!created) {
                    inscriptionDb.uuid = inscriptionEventDto.inscription.uuid;
                    inscriptionDb.studentUuid = inscriptionEventDto.inscription.studentUuid;
                    inscriptionDb.programUuid = inscriptionEventDto.inscription.academicProgram.programUuid;
                    inscriptionDb.programVersionUuid = inscriptionEventDto.inscription.academicProgram.programVersionUuid;
                    inscriptionDb.eventReceivingQueueUuid = inscriptionEventDto.uuid;
                    inscriptionDb.institutionAbbreviation = inscriptionEventDto.inscription.institutionAbbreviation;
                    inscriptionDb.modality = inscriptionEventDto.inscription.modality;
                    inscriptionDb.introductoryModule = (_b = inscriptionEventDto.inscription.introductoryModule) === null || _b === void 0 ? void 0 : _b.academicElementUuid;
                    inscriptionDb.status = inscriptionEventDto.inscription.status;
                    inscriptionDb.lang = inscriptionEventDto.inscription.contentLanguage;
                    inscriptionDb.registeredAt = inscriptionEventDto.inscription.registeredAt;
                    inscriptionDb.programStartedAt = inscriptionEventDto.inscription.programStartedAt;
                    inscriptionDb.programFinishedAt = inscriptionEventDto.inscription.programFinishedAt;
                    inscriptionDb.extensionFinishedAt = inscriptionEventDto.inscription.extensionFinishedAt;
                    inscriptionDb.processWhen = processWhen;
                    inscriptionDb.processed = false;
                    yield inscriptionDb.save();
                    console.log("Inscription record found, update applied instead...");
                }
                return inscription_entity_1.default.fromRow(inscriptionDb);
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    getByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inscriptionDb = yield models_1.InscriptionSequelize.findOne({
                    where: {
                        uuid: uuid
                    }
                });
                if (!inscriptionDb)
                    return null;
                return inscription_entity_1.default.fromRow(inscriptionDb);
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    updateByEntity(inscriptionEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.InscriptionSequelize.update(inscriptionEntity, {
                    where: {
                        uuid: inscriptionEntity.uuid
                    }
                });
                return inscriptionEntity;
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    getAcademicRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const academicRecords = [];
                const inscriptions = yield models_1.InscriptionSequelize.findAll();
                for (const inscription of inscriptions) {
                    const degrees = yield new degree_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                    if (degrees.length == 0) {
                        continue;
                    }
                    inscription.degrees = degrees;
                    inscription.enrollments = yield new enrollment_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                    if (inscription.enrollments.length > 0) {
                        for (const enrollment of inscription.enrollments) {
                            enrollment.academicSelections = yield new academicSelection_datasource_impl_1.default().getByEnrollmentUuid(enrollment.uuid);
                        }
                    }
                    academicRecords.push(new academicRecord_entity_1.default(inscription_entity_1.default.fromRow(inscription)));
                }
                return academicRecords;
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    getAcademicRecordByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inscription = yield models_1.InscriptionSequelize.findOne({
                    where: {
                        uuid
                    }
                });
                if (!inscription)
                    return null;
                const degrees = yield new degree_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                inscription.degrees = degrees;
                inscription.enrollments = yield new enrollment_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                if (inscription.enrollments.length > 0) {
                    for (const enrollment of inscription.enrollments) {
                        enrollment.academicSelections = yield new academicSelection_datasource_impl_1.default().getByEnrollmentUuid(enrollment.uuid);
                    }
                }
                return new academicRecord_entity_1.default(inscription_entity_1.default.fromRow(inscription));
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    getNotProcessedAfterNow() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const academicRecords = [];
                const inscriptions = yield models_1.InscriptionSequelize.findAll({
                    where: {
                        processWhen: {
                            [sequelize_1.Op.lt]: new Date(),
                        },
                        processed: false
                    }
                });
                for (const inscription of inscriptions) {
                    const degrees = yield new degree_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                    if (degrees.length == 0) {
                        continue;
                    }
                    inscription.degrees = degrees;
                    inscription.enrollments = yield new enrollment_datasource_impl_1.default().getByInscriptionUuid(inscription.uuid);
                    if (inscription.enrollments.length > 0) {
                        for (const enrollment of inscription.enrollments) {
                            enrollment.academicSelections = yield new academicSelection_datasource_impl_1.default().getByEnrollmentUuid(enrollment.uuid);
                        }
                    }
                    academicRecords.push(new academicRecord_entity_1.default(inscription_entity_1.default.fromRow(inscription)));
                }
                return academicRecords;
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    setAcademicRecordNotProcessed(academicRecordEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                academicRecordEntity.inscription.processed = false;
                yield this.updateByEntity(academicRecordEntity.inscription);
                return academicRecordEntity;
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    setAcademicRecordPrcessed(academicRecordEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                academicRecordEntity.inscription.processed = true;
                yield this.updateByEntity(academicRecordEntity.inscription);
                return academicRecordEntity;
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
}
exports.default = InscriptionDatasourceImpl;
