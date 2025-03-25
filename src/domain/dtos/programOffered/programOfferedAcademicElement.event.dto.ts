export default class ProgramOfferedAcademicElementEventDto {
    constructor(
        public uuid: string,
        public typeElement: string,
        public abbreviation: string,
        public version?: string,
    ){}

    static create(object: { [key: string]: any }): [string?, ProgramOfferedAcademicElementEventDto?] {
        const {uuid, abbr, version} = object
        const messageErrorComplement = 'missing in programOfferedAcademicElement structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!object['type']) return [`type ${messageErrorComplement}`, undefined]
        if (!abbr) return [`abbr ${messageErrorComplement}`, undefined]

        return [undefined, new ProgramOfferedAcademicElementEventDto(uuid, object['type'], abbr, version)]
    }
}