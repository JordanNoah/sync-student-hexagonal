export default class InscriptionIntroductoryModuleEventDto {
    constructor(
        public programVersionUuid: string,
        public programUuid: string,
        public academicElementUuid: string
    ){}

    static create(object: { [key: string]: any }): [string?, InscriptionIntroductoryModuleEventDto?] {
        const {program_version_uuid, program_uuid, academic_element_uuid} = object
        const messageErrorComplement = 'missing in inscription introductory module structure'
        if (!program_version_uuid) return [`program_version_uuid ${messageErrorComplement}`, undefined]
        if (!program_uuid) return [`program_uuid ${messageErrorComplement}`, undefined]
        if (!academic_element_uuid) return [`academic_element_uuid ${messageErrorComplement}`, undefined]
        return [undefined, new InscriptionIntroductoryModuleEventDto(program_version_uuid, program_uuid, academic_element_uuid)]
    }
}