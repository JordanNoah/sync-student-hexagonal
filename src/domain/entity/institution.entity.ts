import { InstitutionSequelize } from "@/infrastructure/database/models";

export default class InstitutionEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public fullName: string,
        public abbreviation: string,
        public domain: string,
        public website: string,
        public restPath: string,
        public modality: string,
        public translation: string,
        public parent: number | null,
        public importance: number | null,
        public token: string,
        public active: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date
    ){}
    static fromRow(row: InstitutionSequelize): InstitutionEntity {
        return new InstitutionEntity(
            row.id,
            row.uuid,
            row.name,
            row.fullName,
            row.abbreviation,
            row.domain,
            row.website,
            row.restPath,
            row.modality,
            row.translation,
            row.parent,
            row.importance,
            row.token,
            row.active,
            row.createdAt,
            row.updatedAt,
            row.deletedAt
        )
    }
}