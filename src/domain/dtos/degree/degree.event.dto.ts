import DegreeElementEventDto from "./degreeElement.event.dto"

export default class DegreeEventDto {
    constructor(
        public uuid: string,
        public firedAt: Date,
        public degree: DegreeElementEventDto
    ){}

    static create(object: { [key: string]: any }): [string?, DegreeEventDto?] {
        const {uuid, fired_at, degree} = object
        const messageErrorComplement = 'missing in degree structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!degree) return [`degree ${messageErrorComplement}`, undefined]

        const [error, degreeElement] = DegreeElementEventDto.create(degree)
        if (error) return [error, undefined]

        return [undefined, new DegreeEventDto(uuid, new Date(fired_at), degreeElement!)]
    }
}