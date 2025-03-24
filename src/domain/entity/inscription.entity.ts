import { InscriptionSequelize } from "@/infrastructure/database/models";
import EnrollmentEntity from "./enrollment.entity";
import DegreeEntity from "./degree.entity";
import InstitutionEntity from "./institution.entity";
import StudentToMoodleDto from "../dtos/moodle/student.moodle.dto";
import EnrollmentMoodleDto from "../dtos/moodle/enrollment.moodle.dto";
import { GroupElementEduSyncDto } from "../dtos/educationalSynchro/groups.eduSync.dto";

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
        public introductoryModule?: string,
        public enrollments?: EnrollmentEntity[],
        public degrees?: DegreeEntity[],
        public institution?: InstitutionEntity,
        public groups?: string[],
        public student?: StudentToMoodleDto,
        public moodleEnrollments?: EnrollmentMoodleDto[],
        public groupsMoodle?: GroupElementEduSyncDto[],
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
            row.introductoryModule,
            row.enrollments,
            row.degrees
        )
    }
}