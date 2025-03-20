export default class ProgramOfferedProgramEventDto {
    constructor(
        public uuid: string,
        public abbreviation: string,
        public version?: string | null,
    ){}

    static create(object: { [key: string]: any }): [string?, ProgramOfferedProgramEventDto?] {
        const {uuid, abbreviation, version} = object
        const messageErrorComplement = 'missing in programOfferedProgram structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!abbreviation) return [`abbreviation ${messageErrorComplement}`, undefined]

        return [undefined, new ProgramOfferedProgramEventDto(uuid, version, abbreviation)]
    }
}