export default class ProgramOfferedAcademicElementEventDto {
    constructor(
        public uuid: string,
        public typeElement: string,
        public abbreviation: string,
        public version: string,
    ){}

    static create(object: { [key: string]: any }): [string?, ProgramOfferedAcademicElementEventDto?] {
        const {uuid, abbreviation, version} = object
        const messageErrorComplement = 'missing in programOfferedAcademicElement structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!object['type']) return [`type ${messageErrorComplement}`, undefined]
        if (!abbreviation) return [`abbreviation ${messageErrorComplement}`, undefined]
        if (!version) return [`version ${messageErrorComplement}`, undefined]

        return [undefined, new ProgramOfferedAcademicElementEventDto(uuid, object['type'], abbreviation, version)]
    }
}