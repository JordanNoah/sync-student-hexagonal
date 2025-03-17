export default class ChangeEnrollmentAcademicProgramEventDto {
    constructor(
        public uuid: string,
        public firedAt: Date,
        public enrollment:ChangeEnrollmentAcademicProgramEnrollmentEventDto,
    ) {}

    static create(object: { [key: string]: any }): [string?, ChangeEnrollmentAcademicProgramEventDto?] {
        const {uuid, fired_at, enrollment} = object
        const messageErrorComplement = 'missing in enrollment structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!enrollment) return [`enrollment ${messageErrorComplement}`, undefined]

        const [error, enrollmentElement] = ChangeEnrollmentAcademicProgramEnrollmentEventDto.create(enrollment)
        if (error) return [error, undefined]

        return [undefined, new ChangeEnrollmentAcademicProgramEventDto(uuid, new Date(fired_at), enrollmentElement!)]
    }
}

export class ChangeEnrollmentAcademicProgramElementEventDto {
    constructor(
        public oldElement: ChangeEnrollmentAcademicProgramElementDataEventDto,
        public newElement: ChangeEnrollmentAcademicProgramElementDataEventDto,
    ) {}

    static create(object: { [key: string]: any }): [string?, ChangeEnrollmentAcademicProgramElementEventDto?] {
        const {old} = object
        const messageErrorComplement = 'missing in enrollment academic program structure'
        if (!old) return [`old ${messageErrorComplement}`, undefined]
        if (!object['new']) return [`new ${messageErrorComplement}`, undefined]

        const [errorOld, oldElement] = ChangeEnrollmentAcademicProgramElementDataEventDto.create(old)
        if (errorOld) return [errorOld, undefined]

        const [errorNew, newElementData] = ChangeEnrollmentAcademicProgramElementDataEventDto.create(object['new'])
        if (errorNew) return [errorNew, undefined]

        return [undefined, new ChangeEnrollmentAcademicProgramElementEventDto(oldElement!, newElementData!)]
    }
}

export class ChangeEnrollmentAcademicProgramEnrollmentEventDto {
    constructor(
        public uuid: string,
        public insciptionUuid: string,
        public academicProgram: ChangeEnrollmentAcademicProgramElementEventDto,
    ) {}

    static create(object: { [key: string]: any }): [string?, ChangeEnrollmentAcademicProgramEnrollmentEventDto?] {
        const {uuid, insciption_uuid, academic_program} = object
        const messageErrorComplement = 'missing in enrollment structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!insciption_uuid) return [`insciption_uuid ${messageErrorComplement}`, undefined]
        if (!academic_program) return [`academic_program ${messageErrorComplement}`, undefined]

        const [error, academicProgram] = ChangeEnrollmentAcademicProgramElementEventDto.create(academic_program)
        if (error) return [error, undefined]

        return [undefined, new ChangeEnrollmentAcademicProgramEnrollmentEventDto(uuid, insciption_uuid, academicProgram!)]
    }
}

export class ChangeEnrollmentAcademicProgramElementDataEventDto {
    constructor(
        public programUuid: string,
        public programVersionUuid: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, ChangeEnrollmentAcademicProgramElementDataEventDto?] {
        const {program_uuid, program_version_uuid} = object
        const messageErrorComplement = 'missing in enrollment academic program structure'
        if (!program_uuid) return [`program_uuid ${messageErrorComplement}`, undefined]
        if (!program_version_uuid) return [`program_version_uuid ${messageErrorComplement}`, undefined]

        return [undefined, new ChangeEnrollmentAcademicProgramElementDataEventDto(program_uuid, program_version_uuid)]
    }
}