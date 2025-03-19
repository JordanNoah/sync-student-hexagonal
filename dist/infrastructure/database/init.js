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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSequelize = void 0;
const custom_error_1 = require("@/domain/errors/custom.error");
const models_1 = require("./models");
const institution_seeder_exec_1 = require("./seeders/exec/institution.seeder.exec");
const DbSequelize = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Code to connect to the database
        yield models_1.AcademicPeriodSequelize.sync();
        yield models_1.AcademicSelectionSequelize.sync();
        yield models_1.DegreeSequelize.sync();
        yield models_1.EnrollmentSequelize.sync();
        yield models_1.InscriptionSequelize.sync();
        yield models_1.InstitutionSequelize.sync();
        yield new institution_seeder_exec_1.InstitutionSeederExec().up();
    }
    catch (error) {
        throw custom_error_1.CustomError.internalServer(error);
    }
});
exports.DbSequelize = DbSequelize;
