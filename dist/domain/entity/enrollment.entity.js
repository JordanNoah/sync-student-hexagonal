"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnrollmentEntity {
    constructor(id, uuid, studentUuid, inscriptionUuid, programUuid, programVersion, programVersionUuid, academicTermUuid, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.uuid = uuid;
        this.studentUuid = studentUuid;
        this.inscriptionUuid = inscriptionUuid;
        this.programUuid = programUuid;
        this.programVersion = programVersion;
        this.programVersionUuid = programVersionUuid;
        this.academicTermUuid = academicTermUuid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    static fromRow(row) {
        return new EnrollmentEntity(row.id, row.uuid, row.studentUuid, row.inscriptionUuid, row.programUuid, row.programVersion, row.programVersionUuid, row.academicTermUuid, row.createdAt, row.updatedAt, row.deletedAt);
    }
}
exports.default = EnrollmentEntity;
