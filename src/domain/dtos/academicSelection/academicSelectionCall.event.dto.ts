export default class AcademicSelectionCallEventDto {
    constructor(
        public uuid: string | null,
    ){}

    static create(object: { [key: string]: any }): [string?, AcademicSelectionCallEventDto?] {
        const {uuid} = object

        return [undefined, new AcademicSelectionCallEventDto(uuid)]
    }
}