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
}
exports.default = InscriptionDatasourceImpl;
