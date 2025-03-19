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
const enrollment_entity_1 = __importDefault(require("../../domain/entity/enrollment.entity"));
const custom_error_1 = require("../../domain/errors/custom.error");
const models_1 = require("../database/models");
class EnrollmentDatasourceImpl {
    createUpdate(enrollmentEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [enrollmentDb, created] = yield models_1.EnrollmentSequelize.findOrCreate({
                    where: {
                        uuid: enrollmentEventDto.enrollment.uuid
                    },
                    defaults: {
                        uuid: enrollmentEventDto.enrollment.uuid,
                        studentUuid: enrollmentEventDto.enrollment.studentUuid,
                        inscriptionUuid: enrollmentEventDto.enrollment.inscriptionUuid,
                        programUuid: enrollmentEventDto.enrollment.academicProgram.programUuid,
                        programVersion: enrollmentEventDto.enrollment.academicProgram.version,
                        programVersionUuid: enrollmentEventDto.enrollment.academicProgram.programVersionUuid,
                        academicTermUuid: enrollmentEventDto.enrollment.academicTerm.uuid,
                    }
                });
                if (!created) {
                    enrollmentDb.uuid = enrollmentEventDto.enrollment.uuid;
                    enrollmentDb.studentUuid = enrollmentEventDto.enrollment.studentUuid;
                    enrollmentDb.inscriptionUuid = enrollmentEventDto.enrollment.inscriptionUuid;
                    enrollmentDb.programUuid = enrollmentEventDto.enrollment.academicProgram.programUuid;
                    enrollmentDb.programVersion = enrollmentEventDto.enrollment.academicProgram.version;
                    enrollmentDb.programVersionUuid = enrollmentEventDto.enrollment.academicProgram.programVersionUuid;
                    enrollmentDb.academicTermUuid = enrollmentEventDto.enrollment.academicTerm.uuid;
                    yield enrollmentDb.save();
                    console.log("Enrollment record found, update applied instead...");
                }
                return enrollment_entity_1.default.fromRow(enrollmentDb);
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
                const enrollmentDb = yield models_1.EnrollmentSequelize.findOne({
                    where: {
                        uuid
                    }
                });
                return enrollmentDb ? enrollment_entity_1.default.fromRow(enrollmentDb) : null;
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.EnrollmentSequelize.destroy({
                    where: {
                        id
                    }
                });
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    updateByEntity(enrollmentEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.EnrollmentSequelize.update(enrollmentEntity, {
                    where: {
                        uuid: enrollmentEntity.uuid
                    }
                });
                return enrollmentEntity;
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
    getByInscriptionUuid(inscriptionUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enrollments = yield models_1.EnrollmentSequelize.findAll({
                    where: {
                        inscriptionUuid
                    }
                });
                return enrollments.map(enrollment => enrollment_entity_1.default.fromRow(enrollment));
            }
            catch (error) {
                custom_error_1.CustomError.throwAnError(error);
                return Promise.reject(error);
            }
        });
    }
}
exports.default = EnrollmentDatasourceImpl;
