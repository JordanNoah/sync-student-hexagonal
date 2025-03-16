export default class DegreeElementEventDto {
    constructor(
        public uuid: string,
        public inscriptionUuid: string,
        public institution?:string
    ){}

    static create(object: { [key: string]: any }): [string?, DegreeElementEventDto?] {
        const {uuid, inscription_uuid, institution} = object
        const messageErrorComplement = 'missing in degree structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!inscription_uuid) return [`inscription_uuid ${messageErrorComplement}`, undefined]
        if (!institution) return [`institution ${messageErrorComplement}`, undefined]
        return [undefined, new DegreeElementEventDto(uuid, inscription_uuid, institution)]
    }
}