"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnrollmentAcademicTermEventDto {
    constructor(uuid) {
        this.uuid = uuid;
    }
    static create(object) {
        const { uuid } = object;
        const messageErrorComplement = 'missing in enrollment academic term structure';
        if (!uuid)
            return [`uuid ${messageErrorComplement}`, undefined];
        return [undefined, new EnrollmentAcademicTermEventDto(uuid)];
    }
}
exports.default = EnrollmentAcademicTermEventDto;
