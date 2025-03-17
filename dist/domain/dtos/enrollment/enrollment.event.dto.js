"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enrollmentElement_event_dto_1 = __importDefault(require("./enrollmentElement.event.dto"));
class EnrollmentEventDto {
    constructor(uuid, firedAt, enrollment) {
        this.uuid = uuid;
        this.firedAt = firedAt;
        this.enrollment = enrollment;
    }
    static create(object) {
        const { uuid, fired_at, enrollment } = object;
        const messageErrorComplement = 'missing in enrollment structure';
        if (!uuid)
            return [`uuid ${messageErrorComplement}`, undefined];
        if (!fired_at)
            return [`fired_at ${messageErrorComplement}`, undefined];
        if (!enrollment)
            return [`enrollment ${messageErrorComplement}`, undefined];
        const [error, enrollmentElement] = enrollmentElement_event_dto_1.default.registered(enrollment);
        if (error)
            return [error, undefined];
        return [undefined, new EnrollmentEventDto(uuid, new Date(fired_at), enrollmentElement)];
    }
    static changeStatus(object) {
        const { uuid, fired_at, enrollment } = object;
        const messageErrorComplement = 'missing in enrollment structure';
        if (!uuid)
            return [`uuid ${messageErrorComplement}`, undefined];
        if (!fired_at)
            return [`fired_at ${messageErrorComplement}`, undefined];
        if (!enrollment)
            return [`enrollment ${messageErrorComplement}`, undefined];
        const [error, enrollmentElement] = enrollmentElement_event_dto_1.default.changeStatus(enrollment);
        if (error)
            return [error, undefined];
        return [undefined, new EnrollmentEventDto(uuid, new Date(fired_at), enrollmentElement)];
    }
}
exports.default = EnrollmentEventDto;
