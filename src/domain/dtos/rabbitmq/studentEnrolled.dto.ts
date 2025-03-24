import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import InscriptionEntity from "@/domain/entity/inscription.entity";
import appConfig from "@/shared/appConfig";

class Student {
    constructor(
        public uuid: string,
        public reference_id: number,
        public username: string,
        public email: string
    ){}
    static create(object: InscriptionEntity): [string?, Student?] {
        const student = object.student!;
        return [undefined, new Student(
            object.studentUuid,
            student.id!,
            student.username,
            student.email
        )];
    }
}

class Institution {
    constructor(
        public abbreviation: string,
        public modality: string
    ){}
    static create(object: InscriptionEntity): [string?, Institution?]{
        const campus = object.institution!;
        return [undefined, new Institution(
            campus.abbreviation,
            campus.modality
        )];
    }
}

class Inscription {
    constructor(
        public uuid: string,
        public created_at: string,
        public registered_at: string,
        public started_at: string,
        public finished_at: string,
        public status: string,
        public modality: string
    ){}
    static create(object: InscriptionEntity): [string?, Inscription?]{
        return [undefined, new Inscription(
            object.uuid,
            object.createdAt.toISOString(),
            object.registeredAt.toISOString(),
            object.programStartedAt.toISOString(),
            object.programFinishedAt.toISOString(),
            object.status,
            object.modality
        )]
    }
}

class Campus {
    constructor(
        public uuid: string,
        public name: string,
        public abbreviation: string,
        public modality: string,
        public domain: string,
        public website: string,
        public environment: string
    ){}
    static create(object: InscriptionEntity): [string?, Campus?]{
        const campus = object.institution!;
        return [undefined, new Campus(
            campus.uuid,
            campus.name,
            `EVA-${campus.abbreviation}`,
            campus.modality,
            campus.domain,
            campus.website,
            appConfig.ENVIRONMENT
        )];
    }
}

export default class StudentEnrolledDto {
    constructor(
        public uuid: string,
        public fired_at: string,
        public student: Student,
        public inscription: Inscription,
        public institution: Institution,
        public campus: Campus
    ) { }

    static create(object: AcademicRecordEntity): [string?, StudentEnrolledDto?] {
        const [error, student] = Student.create(object.inscription);
        if (error) return [error, undefined];

        const [errorInscription, inscription] = Inscription.create(object.inscription);
        if (errorInscription) return [errorInscription, undefined];

        const [errorInstitution, institution] = Institution.create(object.inscription);
        if (errorInstitution) return [errorInstitution, undefined];

        const [errorCampus, campus] = Campus.create(object.inscription);
        if (errorCampus) return [errorCampus, undefined];

        return [undefined, new StudentEnrolledDto(
            crypto.randomUUID(),
            new Date().toISOString(),
            student!,
            inscription!,
            institution!,
            campus!
        )];
    }
}