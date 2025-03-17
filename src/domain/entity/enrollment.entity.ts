import { EnrollmentSequelize } from "@/infrastructure/database/models";
import AcademicSelectionEntity from "./academicSelection.entity";

export default class EnrollmentEntity {
    constructor(
        public id: number,
        public uuid: string,
        public studentUuid: string,
        public inscriptionUuid: string,
        public programUuid: string,
        public programVersion: string,
        public programVersionUuid: string | null,
        public academicTermUuid: string | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date,
        public academicSelections?: AcademicSelectionEntity[]
    ){}

    static fromRow(row: EnrollmentSequelize): EnrollmentEntity {
        return new EnrollmentEntity(
            row.id,
            row.uuid,
            row.studentUuid,
            row.inscriptionUuid,
            row.programUuid,
            row.programVersion,
            row.programVersionUuid,
            row.academicTermUuid,
            row.createdAt,
            row.updatedAt,
            row.deletedAt,
            row.academicSelections
        )
    }
}