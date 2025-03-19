"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InscriptionEntity {
    constructor(id, uuid, studentUuid, programUuid, programVersionUuid, eventReceivingQueueUuid, institutionAbbreviation, modality, status, lang, registeredAt, programStartedAt, programFinishedAt, extensionFinishedAt, processWhen, processed, createdAt, updatedAt, deletedAt, introductoryModule, enrollments, degrees) {
        this.id = id;
        this.uuid = uuid;
        this.studentUuid = studentUuid;
        this.programUuid = programUuid;
        this.programVersionUuid = programVersionUuid;
        this.eventReceivingQueueUuid = eventReceivingQueueUuid;
        this.institutionAbbreviation = institutionAbbreviation;
        this.modality = modality;
        this.status = status;
        this.lang = lang;
        this.registeredAt = registeredAt;
        this.programStartedAt = programStartedAt;
        this.programFinishedAt = programFinishedAt;
        this.extensionFinishedAt = extensionFinishedAt;
        this.processWhen = processWhen;
        this.processed = processed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.introductoryModule = introductoryModule;
        this.enrollments = enrollments;
        this.degrees = degrees;
    }
    static fromRow(row) {
        return new InscriptionEntity(row.id, row.uuid, row.studentUuid, row.programUuid, row.programVersionUuid, row.eventReceivingQueueUuid, row.institutionAbbreviation, row.modality, row.status, row.lang, row.registeredAt, row.programStartedAt, row.programFinishedAt, row.extensionFinishedAt, row.processWhen, row.processed, row.createdAt, row.updatedAt, row.deletedAt, row.introductoryModule, row.enrollments, row.degrees);
    }
}
exports.default = InscriptionEntity;
