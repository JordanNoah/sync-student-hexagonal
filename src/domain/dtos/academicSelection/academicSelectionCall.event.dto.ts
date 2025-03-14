export default class AcademicSelectionCallEventDto {
    constructor(
        public uuid: string,
    ){}

    static create(object: { [key: string]: any }): [string?, AcademicSelectionCallEventDto?] {
        const {uuid} = object
        const messageErrorComplement = 'missing in academicSelectionCall structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]

        return [undefined, new AcademicSelectionCallEventDto(uuid)]
    }
}