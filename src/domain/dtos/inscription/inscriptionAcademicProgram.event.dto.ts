export default class InscriptionAcademicProgramEventDto {
    constructor(
        public programUuid: string,
        public programVersionUuid: string
    ){}

    static create(object: { [key: string]: any }): [string?, InscriptionAcademicProgramEventDto?] {
        const {program_uuid,program_version_uuid} = object
        const messageErrorComplement = 'missing in inscription academic program structure'
        if (!program_uuid) return [`program_uuid ${messageErrorComplement}`, undefined]
        if (!program_version_uuid) return [`program_version_uuid ${messageErrorComplement}`, undefined]
        return [undefined, new InscriptionAcademicProgramEventDto(program_uuid, program_version_uuid)]
    }
}