"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InscriptionIntroductoryModuleEventDto {
    constructor(programVersionUuid, programUuid, academicElementUuid) {
        this.programVersionUuid = programVersionUuid;
        this.programUuid = programUuid;
        this.academicElementUuid = academicElementUuid;
    }
    static create(object) {
        const { program_version_uuid, program_uuid, academic_element_uuid } = object;
        const messageErrorComplement = 'missing in inscription introductory module structure';
        if (!program_version_uuid)
            return [`program_version_uuid ${messageErrorComplement}`, undefined];
        if (!program_uuid)
            return [`program_uuid ${messageErrorComplement}`, undefined];
        if (!academic_element_uuid)
            return [`academic_element_uuid ${messageErrorComplement}`, undefined];
        return [undefined, new InscriptionIntroductoryModuleEventDto(program_version_uuid, program_uuid, academic_element_uuid)];
    }
}
exports.default = InscriptionIntroductoryModuleEventDto;
