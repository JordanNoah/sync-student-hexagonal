"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inscriptionAcademicProgram_event_dto_1 = __importDefault(require("./inscriptionAcademicProgram.event.dto"));
const inscriptionIntroductoryModule_event_dto_1 = __importDefault(require("./inscriptionIntroductoryModule.event.dto"));
class InscriptionElementEventDto {
    constructor(uuid, studentUuid, academicProgram, introductoryModule, institutionAbbreviation, modality, status, contentLanguage, createdAt, registeredAt, programStartedAt, programFinishedAt, extensionFinishedAt) {
        this.uuid = uuid;
        this.studentUuid = studentUuid;
        this.academicProgram = academicProgram;
        this.introductoryModule = introductoryModule;
        this.institutionAbbreviation = institutionAbbreviation;
        this.modality = modality;
        this.status = status;
        this.contentLanguage = contentLanguage;
        this.createdAt = createdAt;
        this.registeredAt = registeredAt;
        this.programStartedAt = programStartedAt;
        this.programFinishedAt = programFinishedAt;
        this.extensionFinishedAt = extensionFinishedAt;
    }
    static registered(object) {
        const { uuid, student_uuid, academic_program, introductory_module, institution_abbreviation, modality, status, content_language, created_at, registered_at, program_started_at, program_finished_at, extension_finished_at } = object;
        const messageErrorComplement = 'missing in inscription structure';
        if (!uuid)
            return [`uuid ${messageErrorComplement}`, undefined];
        if (!student_uuid)
            return [`student_uuid ${messageErrorComplement}`, undefined];
        if (!academic_program)
            return [`academic_program ${messageErrorComplement}`, undefined];
        if (!institution_abbreviation)
            return [`institution_abbreviation ${messageErrorComplement}`, undefined];
        if (!modality)
            return [`modality ${messageErrorComplement}`, undefined];
        if (!status)
            return [`status ${messageErrorComplement}`, undefined];
        if (!content_language)
            return [`content_language ${messageErrorComplement}`, undefined];
        if (!created_at)
            return [`created_at ${messageErrorComplement}`, undefined];
        if (!registered_at)
            return [`registered_at ${messageErrorComplement}`, undefined];
        if (!program_started_at)
            return [`program_started_at ${messageErrorComplement}`, undefined];
        if (!program_finished_at)
            return [`program_finished_at ${messageErrorComplement}`, undefined];
        if (!extension_finished_at)
            return [`extension_finished_at ${messageErrorComplement}`, undefined];
        const [error, academicProgram] = inscriptionAcademicProgram_event_dto_1.default.create(academic_program);
        if (error)
            return [error, undefined];
        let introductoryModuleDto = null;
        if (introductory_module) {
            const [error, introductoryModule] = inscriptionIntroductoryModule_event_dto_1.default.create(introductory_module);
            if (error)
                return [error, undefined];
            introductoryModuleDto = introductoryModule;
        }
        return [
            undefined,
            new InscriptionElementEventDto(uuid, student_uuid, academicProgram, introductoryModuleDto, institution_abbreviation, modality, status, content_language, new Date(created_at), new Date(registered_at), new Date(program_started_at), new Date(program_finished_at), new Date(extension_finished_at))
        ];
    }
}
exports.default = InscriptionElementEventDto;
