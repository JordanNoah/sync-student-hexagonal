"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enrollmentAcademicProgram_event_dto_1 = __importDefault(require("./enrollmentAcademicProgram.event.dto"));
const enrollmentAcademicTerm_event_dto_1 = __importDefault(require("./enrollmentAcademicTerm.event.dto"));
class EnrollmentElementEventDto {
    constructor(uuid, studentUuid, inscriptionUuid, academicProgram, academicTerm) {
        this.uuid = uuid;
        this.studentUuid = studentUuid;
        this.inscriptionUuid = inscriptionUuid;
        this.academicProgram = academicProgram;
        this.academicTerm = academicTerm;
    }
    static registered(object) {
        const { uuid, student_uuid, inscription_uuid, academic_program, academic_term } = object;
        const messageErrorComplement = 'missing in enrollment structure';
        if (!uuid)
            return [`uuid ${messageErrorComplement}`, undefined];
        if (!student_uuid)
            return [`student_uuid ${messageErrorComplement}`, undefined];
        if (!inscription_uuid)
            return [`inscription_uuid ${messageErrorComplement}`, undefined];
        if (!academic_program)
            return [`academic_program ${messageErrorComplement}`, undefined];
        if (!academic_term)
            return [`academic_term ${messageErrorComplement}`, undefined];
        const [error, academicProgram] = enrollmentAcademicProgram_event_dto_1.default.create(academic_program);
        if (error)
            return [error, undefined];
        const [errorAcademicTerm, academicTerm] = enrollmentAcademicTerm_event_dto_1.default.create(academic_term);
        if (errorAcademicTerm)
            return [errorAcademicTerm, undefined];
        return [
            undefined,
            new EnrollmentElementEventDto(uuid, student_uuid, inscription_uuid, academicProgram, academicTerm)
        ];
    }
}
exports.default = EnrollmentElementEventDto;
