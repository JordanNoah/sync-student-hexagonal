import { AcademicPeriodSequelize } from "@/infrastructure/database/models";

export default class AcademicPeriodEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public startDate: Date,
        public endDate: Date | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date
    ){}

    static fromRow(row: AcademicPeriodSequelize): AcademicPeriodEntity {
        return new AcademicPeriodEntity(
            row.id,
            row.uuid,
            row.name,
            row.startDate,
            row.endDate,
            row.createdAt,
            row.updatedAt,
            row.deletedAt
        )
    }
}