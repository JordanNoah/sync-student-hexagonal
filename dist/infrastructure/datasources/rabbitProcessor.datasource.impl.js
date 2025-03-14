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
class RabbitProcessorDatasourceImpl {
    InscriptioRegisteredProcessor(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log("????????????????");
                const content = JSON.parse(message.content.toString());
                const [errorInscription, inscriptionDto] = inscription_event_dto_1.default.create(content);
                if (errorInscription) {
                    throw custom_error_1.CustomError.internalServer(errorInscription);
                }
                yield new inscription_datasource_impl_1.default().createUpdate(inscriptionDto);
            }
            catch (error) {
                return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
            }
        });
    }
    AcademicSelectionAssociated(message) {
        var _a;
        try {
            throw custom_error_1.CustomError.notFound('Not found error: ' + message);
        }
        catch (error) {
            return (_a = custom_error_1.CustomError.throwAnError(error)) !== null && _a !== void 0 ? _a : Promise.resolve();
        }
    }
    AcademicSelectionDiscarded(message) {
        throw new Error("Method not implemented.");
    }
    AcademicSelectionScheduled(message) {
        throw new Error("Method not implemented.");
    }
    DegreeDeactivated(message) {
        throw new Error("Method not implemented.");
    }
    DegreeRegistered(message) {
        throw new Error("Method not implemented.");
    }
    DegreeWithdrawn(message) {
        throw new Error("Method not implemented.");
    }
    EnrollmentDiscarded(message) {
        throw new Error("Method not implemented.");
    }
    EnrollmentGenerated(message) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const content = JSON.parse(message.content.toString());
                console.log(content);
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
        throw new Error("Method not implemented.");
    }
    InscriptionActivated(message) {
        throw new Error("Method not implemented.");
    }
    InscriptionWithdrawn(message) {
        throw new Error("Method not implemented.");
    }
    ProgramChanged(message) {
        throw new Error("Method not implemented.");
    }
    ProgramEndDateEstablished(message) {
        throw new Error("Method not implemented.");
    }
    ProgramOffered(message) {
        throw new Error("Method not implemented.");
    }
    ProgramStartDateEstablished(message) {
        throw new Error("Method not implemented.");
    }
    RegistrationDateEstablished(message) {
        throw new Error("Method not implemented.");
    }
}
exports.default = RabbitProcessorDatasourceImpl;
