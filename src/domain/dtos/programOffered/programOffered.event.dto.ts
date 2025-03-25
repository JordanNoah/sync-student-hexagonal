import ProgramOfferedAcademicElementEventDto from "./programOfferedAcademicElement.event.dto";
import ProgramOfferedOffertEventDto from "./programOfferedOffert.event.dto";
import ProgramOfferedProgramEventDto from "./programOfferedProgram.event.dto";

export default class ProgramOfferedEventDto {
    constructor(
        public uuid: string,
        public firedAt: Date,
        public programOffered: ProgramOfferedProgramEventDto,
        public offers: ProgramOfferedOffertEventDto[]
    ){}

    static create(object: { [key: string]: any }): [string?, ProgramOfferedEventDto?] {
        const {uuid, fired_at, program, offers} = object
        
        const messageErrorComplement = 'missing in programOffered structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!program) return [`program ${messageErrorComplement}`, undefined]
        if (!offers) return [`offers ${messageErrorComplement}`, undefined]

        const [error, programOfferedDto] = ProgramOfferedProgramEventDto.create(program)
        if (error) return [error, undefined]

        const offersDto: ProgramOfferedOffertEventDto[] = []
        for (const offer of offers) {
            const [errorOffer, offerDto] = ProgramOfferedOffertEventDto.create(offer)
            if (errorOffer) return [errorOffer, undefined]
            offersDto.push(offerDto!)
        }

        return [undefined, new ProgramOfferedEventDto(uuid, new Date(fired_at), programOfferedDto!, offersDto)]
    }
}