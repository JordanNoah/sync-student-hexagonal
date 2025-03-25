import ProgramOfferedAcademicElementEventDto from "./programOfferedAcademicElement.event.dto";
import ProgramOfferedAcademicPeriodEventDto from "./programOfferedAcademicPeriod.event.dto";

export default class ProgramOfferedOffertEventDto {
    constructor(
        public uuid: string,
        public academicPeriod: ProgramOfferedAcademicPeriodEventDto,
        public startDate: Date,
        public endDate: Date | null,
        public academicElement: ProgramOfferedAcademicElementEventDto
    ){}

    static create(object: { [key: string]: any }): [string?, ProgramOfferedOffertEventDto?] {
        const {uuid, academic_period, start_date, end_date, academic_element} = object
        
        const messageErrorComplement = 'missing in programOfferedOffert structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!academic_period) return [`academic_period ${messageErrorComplement}`, undefined]
        if (!start_date) return [`start_date ${messageErrorComplement}`, undefined]
        if (!academic_element) return [`academic_element ${messageErrorComplement}`, undefined]

        const [error, academicProgramDto] = ProgramOfferedAcademicPeriodEventDto.create(academic_period)
        if (error) return [error, undefined]

        const [errorAcademicElement,academicElementDto] = ProgramOfferedAcademicElementEventDto.create(academic_element)
        if (errorAcademicElement) return [errorAcademicElement, undefined]

        return [undefined, new ProgramOfferedOffertEventDto(
            uuid, 
            academicProgramDto!, 
            new Date(start_date),
            end_date ? new Date(end_date) : null,
            academicElementDto!)]
    }
}