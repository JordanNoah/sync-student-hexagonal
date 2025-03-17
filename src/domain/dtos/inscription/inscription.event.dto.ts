import InscriptionElementEventDto from "./inscriptionElement.event.dto";

export default class InscriptionEventDto {
    constructor(
        public uuid: string,
        public firedAt: Date,
        public inscription: InscriptionElementEventDto
    ){}

    static create(object: { [key: string]: any }): [string?, InscriptionEventDto?] {
        const {uuid, fired_at, inscription} = object
        const messageErrorComplement = 'missing in inscription structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!inscription) return [`inscription ${messageErrorComplement}`, undefined]

        const [error, inscriptionElement] = InscriptionElementEventDto.registered(inscription)
        if (error) return [error, undefined]

        return [undefined, new InscriptionEventDto(uuid, new Date(fired_at), inscriptionElement!)]
    }

    static newDate(object: { [key: string]: any }): [string?, InscriptionEventDto?] {
        const {uuid, fired_at, inscription} = object
        const messageErrorComplement = 'missing in inscription structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!inscription) return [`inscription ${messageErrorComplement}`, undefined]

        const [error, inscriptionNewDateDto] = InscriptionElementEventDto.newDate(inscription)
        if (error) return [error, undefined]
        return [undefined, new InscriptionEventDto(uuid, new Date(fired_at), inscriptionNewDateDto!)]
    }

    static changeStatus(object: { [key: string]: any }): [string?, InscriptionEventDto?] {
        const {uuid, fired_at, inscription} = object
        const messageErrorComplement = 'missing in inscription structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!inscription) return [`inscription ${messageErrorComplement}`, undefined]

        const [error, inscriptionElement] = InscriptionElementEventDto.changeStatus(inscription)
        if (error) return [error, undefined]
        return [undefined, new InscriptionEventDto(uuid, new Date(fired_at), inscriptionElement!)]
    }
}