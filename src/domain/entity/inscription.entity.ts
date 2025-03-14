import { InscriptionSequelize } from "@/infrastructure/database/models";

export default class InscriptionEntity {
    constructor(
        public id: number,
        public uuid: string,
        public studentUuid: string,
        public programUuid: string,
        public programVersionUuid: string | null,
        public eventReceivingQueueUuid: string,
        public institutionAbbreviation: string,
        public modality: string,
        public status: string,
        public lang: string,
        public registeredAt: Date,
        public programStartedAt: Date,
        public programFinishedAt: Date,
        public extensionFinishedAt: Date,
        public processWhen: Date | null,
        public processed: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date,
        public introductoryModule?: string
    ){}

    static fromRow(row: InscriptionSequelize): InscriptionEntity {
        return new InscriptionEntity(
            row.id,
            row.uuid,
            row.studentUuid,
            row.programUuid,
            row.programVersionUuid,
            row.eventReceivingQueueUuid,
            row.institutionAbbreviation,
            row.modality,
            row.status,
            row.lang,
            row.registeredAt,
            row.programStartedAt,
            row.programFinishedAt,
            row.extensionFinishedAt,
            row.processWhen,
            row.processed,
            row.createdAt,
            row.updatedAt,
            row.deletedAt,
            row.introductoryModule
        )
    }
}