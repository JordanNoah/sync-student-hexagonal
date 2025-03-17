export default class EnrollmentAcademicProgramEventDto {
    constructor(
        public programUuid: string,
        public programVersionUuid: string,
        public version?: string
    ){}

    static create(object: { [key: string]: any }): [string?, EnrollmentAcademicProgramEventDto?] {
        const {program_uuid, program_version_uuid, version} = object
        const messageErrorComplement = 'missing in enrollment academic program structure'
        if (!program_uuid) return [`program_uuid ${messageErrorComplement}`, undefined]
        if (!program_version_uuid) return [`program_version_uuid ${messageErrorComplement}`, undefined]
        if (!version) return [`version ${messageErrorComplement}`, undefined]

        return [undefined, new EnrollmentAcademicProgramEventDto(program_uuid, program_version_uuid, version)]
    }
}