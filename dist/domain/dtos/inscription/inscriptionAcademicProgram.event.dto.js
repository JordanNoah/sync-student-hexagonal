"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InscriptionAcademicProgramEventDto {
    constructor(programUuid, programVersionUuid) {
        this.programUuid = programUuid;
        this.programVersionUuid = programVersionUuid;
    }
    static create(object) {
        const { program_uuid, program_version_uuid } = object;
        const messageErrorComplement = 'missing in inscription academic program structure';
        if (!program_uuid)
            return [`program_uuid ${messageErrorComplement}`, undefined];
        if (!program_version_uuid)
            return [`program_version_uuid ${messageErrorComplement}`, undefined];
        return [undefined, new InscriptionAcademicProgramEventDto(program_uuid, program_version_uuid)];
    }
}
exports.default = InscriptionAcademicProgramEventDto;
