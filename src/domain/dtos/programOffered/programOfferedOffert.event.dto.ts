import ProgramOfferedAcademicElementEventDto from "./programOfferedAcademicElement.event.dto";
import ProgramOfferedAcademicPeriodEventDto from "./programOfferedAcademicPeriod.event.dto";

export default class ProgramOfferedOffertEventDto {
    constructor(
        public uuid: string,
        public academicPeriod: ProgramOfferedAcademicPeriodEventDto,
        public startDate: Date,
        public endDate: Date,
        public academicElement: ProgramOfferedAcademicElementEventDto
    ){}

    static create(object: { [key: string]: any }): [string?, ProgramOfferedOffertEventDto?] {
        const {uuid, fired_at, program, offers} = object
        const messageErrorComplement = 'missing in programOfferedOffert structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!program) return [`program ${messageErrorComplement}`, undefined]
        if (!offers) return [`offers ${messageErrorComplement}`, undefined]

        const [error, academicProgramDto] = ProgramOfferedAcademicPeriodEventDto.create(program)
        if (error) return [error, undefined]

        const [errorAcademicElement,academicElementDto] = ProgramOfferedAcademicElementEventDto.create(offers)
        if (errorAcademicElement) return [errorAcademicElement, undefined]

        return [undefined, new ProgramOfferedOffertEventDto(uuid, academicProgramDto!, new Date(fired_at), new Date(fired_at), academicElementDto!)]
    }
}