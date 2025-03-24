import InscriptionEntity from "@/domain/entity/inscription.entity";
import InstitutionEntity from "@/domain/entity/institution.entity";
import StudentToMoodleDto from "../moodle/student.moodle.dto";
import EnrollmentMoodleDto from "../moodle/enrollment.moodle.dto";
import { GroupElementEduSyncDto } from "../educationalSynchro/groups.eduSync.dto";

export class GroupAssignmentDto {
    constructor(
        public course_id: number,
        public assigned: string[],
    ) { }

    static create(object: GroupElementEduSyncDto[]): [string?, GroupAssignmentDto[]?] {
        const map = new Map<number, Set<string>>();

        for (const item of object) {
            if (!map.has(item.courseId)) {
                map.set(item.courseId, new Set());
            }
            map.get(item.courseId)!.add(item.idNumber);
        }

        const groups: GroupAssignmentDto[] = [];
        for (const [courseId, idNumbers] of map.entries()) {
            groups.push(new GroupAssignmentDto(courseId, Array.from(idNumbers)));
        }

        return [undefined, groups];
    }
}


export class EnrollmentDto {
    constructor(
        public userid: number,
        public courseid: number,
        public timestart: number,
        public timeend: number,
    ) { }

    static create(object: EnrollmentMoodleDto): [string?, EnrollmentDto?] {
        return [undefined, new EnrollmentDto(
            object.userid,
            object.courseid,
            object.timestart!,
            object.timeend!
        )];
    }
}

export class UserDataDto {
    constructor(
        public email: string,
        public username: string,
        public idnumber: string,
        public firstname: string,
        public lastname: string,
        public password: string,
        public country: string | null,
        public address: string | null,
        public id: number,
    ) { }

    static create(object: StudentToMoodleDto): [string?, UserDataDto?] {
        return [undefined, new UserDataDto(
            object.email,
            object.username,
            object.idnumber,
            object.firstname,
            object.lastname,
            object.password,
            null,
            null,
            object.id!
        )];
    }
}

export class StoredDataDto {
    constructor(
        public user: UserDataDto[],
        public enrollments: EnrollmentDto[],
        public groups: GroupAssignmentDto[],
    ) { }

    static create(object: InscriptionEntity): [string?, StoredDataDto?] {
        const user: UserDataDto[] = [];
        const enrollments: EnrollmentDto[] = [];

        const [err, userDto] = UserDataDto.create(object.student!);
        if (err) return [err, undefined];
        user.push(userDto!);

        for (const e of object.moodleEnrollments!) {
            const [err, dto] = EnrollmentDto.create(e);
            if (err) return [err, undefined];
            enrollments.push(dto!);
        }

        const [errGroup, groupDto] = GroupAssignmentDto.create(object.groupsMoodle!);
        if (errGroup) return [err, undefined];
        const groups: GroupAssignmentDto[] = groupDto!;

        return [undefined, new StoredDataDto(user, enrollments, groups)];
    }
}

export class CampusDto {
    constructor(
        public domain: string,
        public institution: string,
        public modality: string,
        public degree: string,
        public exist_campus: boolean,
        public stored_data: StoredDataDto,
        public postponed_data: any,
    ) { }

    static create(object: InscriptionEntity): [string?, CampusDto?] {
        const campus = object.institution!;
        const inscription = object;
        const [err, stored] = StoredDataDto.create(inscription);
        if (err) return [err, undefined];

        return [undefined, new CampusDto(
            campus.domain,
            campus.abbreviation,
            campus.modality,
            inscription.degrees![0].instituionComing,
            true,
            stored!,
            {}
        )];
    }
}

export class DetectedErrorsDto {
    constructor(
        public user: any[],
        public enroll: any[],
        public unexpected: any[],
        public unenroll: any[],
        public groups: any[],
    ) { }

    static create(object: any): [string?, DetectedErrorsDto?] {
        return [undefined, new DetectedErrorsDto(
            object.user || [],
            object.enroll || [],
            object.unexpected || [],
            object.unenroll || [],
            object.groups || [],
        )];
    }
}

export class TransactionDetailDto {
    constructor(
        public status: string,
        public status_abbreviation: string,
        public action: string,
        public detected_errors: DetectedErrorsDto,
    ) { }

    static create(object: any): [string?, TransactionDetailDto?] {
        const required = ['status', 'status_abbreviation', 'action'];
        for (const field of required) {
            if (!object[field]) return [`${field} missing in transaction_detail`, undefined];
        }

        const [err, errors] = DetectedErrorsDto.create(object.detected_errors || {});
        if (err) return [err, undefined];

        return [undefined, new TransactionDetailDto(
            object.status,
            object.status_abbreviation,
            object.action,
            errors!
        )];
    }
}

export class InscriptionDto {
    constructor(
        public inscription_uuid: string,
        public transaction_detail: TransactionDetailDto,
        public campus: CampusDto,
    ) { }

    static create(object: InscriptionEntity): [string?, InscriptionDto?] {
        const [error,campusDto] = CampusDto.create(object)
        if (error) return [error, undefined]
        return [undefined, new InscriptionDto(
            object.uuid,
            new TransactionDetailDto('Success','success','SIGN_INSCRIPTION',new DetectedErrorsDto([],[],[],[],[])),
            campusDto!
        )];
    }
}

export default class StudentSynchronizedDto {
    constructor(
        public uuid: string,
        public fired_at: string,
        public inscription: InscriptionDto[],
    ) { }

    static create(object: { [key: string]: any }): [string?, StudentSynchronizedDto?] {
        const [error, inscriptionRabbit] = InscriptionDto.create(object.record.inscription)
        if (error) return [error, undefined]

        return [undefined, new StudentSynchronizedDto(
            crypto.randomUUID(),
            new Date().toISOString(),
            [inscriptionRabbit!]
        )];
    }
}
