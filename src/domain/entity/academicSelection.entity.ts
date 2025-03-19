import { AcademicSelectionSequelize } from "@/infrastructure/database/models";
import AcademicPeriodEntity from "./academicPeriod.entity";

export default class AcademicSelectionEntity {
    constructor(
        public id: number,
        public uuid: string,
        public enrollmentUuid: string,
        public academicElementUuid: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date,
        public startedAt?: Date,
        public finishedAt?: Date,
        public callUuid?: string | null,
        public processedAt?: Date | null,
        public academicPeriod?: AcademicPeriodEntity
    ){}

    static fromRow(row: AcademicSelectionSequelize): AcademicSelectionEntity {
        return new AcademicSelectionEntity(
            row.id,
            row.uuid,
            row.enrollmentUuid,
            row.academicElementUuid,
            row.createdAt,
            row.updatedAt,
            row.deletedAt,
            row.startedAt,
            row.finishedAt,
            row.callUuid,
            row.processedAt
        )
    }
}