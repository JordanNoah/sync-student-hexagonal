import { DegreeSequelize } from "@/infrastructure/database/models";

export default class DegreeEntity {
    constructor(
        public id: number,
        public uuid: string,
        public inscriptionUuid: string,
        public instituionComing: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date
    ){}

    static fromRow(row: DegreeSequelize): DegreeEntity {
        return new DegreeEntity(
            row.id,
            row.uuid,
            row.inscriptionUuid,
            row.instituionComing,
            row.createdAt,
            row.updatedAt,
            row.deletedAt
        )
    }
}