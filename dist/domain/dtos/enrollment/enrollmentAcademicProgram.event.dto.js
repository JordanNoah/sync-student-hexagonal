"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnrollmentAcademicProgramEventDto {
    constructor(programUuid, programVersionUuid, version) {
        this.programUuid = programUuid;
        this.programVersionUuid = programVersionUuid;
        this.version = version;
    }
    static create(object) {
        const { program_uuid, program_version_uuid, version } = object;
        const messageErrorComplement = 'missing in enrollment academic program structure';
        if (!program_uuid)
            return [`program_uuid ${messageErrorComplement}`, undefined];
        if (!program_version_uuid)
            return [`program_version_uuid ${messageErrorComplement}`, undefined];
        if (!version)
            return [`version ${messageErrorComplement}`, undefined];
        return [undefined, new EnrollmentAcademicProgramEventDto(program_uuid, program_version_uuid, version)];
    }
}
exports.default = EnrollmentAcademicProgramEventDto;
