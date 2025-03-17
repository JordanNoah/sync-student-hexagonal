import AcademicSelectionElementEventDto from "./academicSelectionElement.event.dto";

export default class AcademicSelectionEventDto {
    constructor(
        public uuid: string,
        public firedAt: Date,
        public academicSelection: AcademicSelectionElementEventDto
    ){}

    static create(object: { [key: string]: any }): [string?, AcademicSelectionEventDto?] {
        const {uuid, fired_at, academic_selection} = object
        const messageErrorComplement = 'missing in academicSelection structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!academic_selection) return [`academic_selection ${messageErrorComplement}`, undefined]

        const [error, academicSelectionElement] = AcademicSelectionElementEventDto.registered(academic_selection)
        if (error) return [error, undefined]

        return [undefined, new AcademicSelectionEventDto(uuid, new Date(fired_at), academicSelectionElement!)]
    }

    static scheduled(object: { [key: string]: any }): [string?, AcademicSelectionEventDto?] {
        const {uuid, fired_at, academic_selection} = object
        const messageErrorComplement = 'missing in academicSelection structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!academic_selection) return [`academic_selection ${messageErrorComplement}`, undefined]

        const [error, academicSelectionElement] = AcademicSelectionElementEventDto.scheduled(academic_selection)
        if (error) return [error, undefined]

        return [undefined, new AcademicSelectionEventDto(uuid, new Date(fired_at), academicSelectionElement!)]
    }

    static changeStatus(object: { [key: string]: any }): [string?, AcademicSelectionEventDto?] {
        const {uuid, fired_at, academic_selection} = object
        const messageErrorComplement = 'missing in academicSelection structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!academic_selection) return [`academic_selection ${messageErrorComplement}`, undefined]

        const [error, academicSelectionElement] = AcademicSelectionElementEventDto.changeStatus(academic_selection)
        if (error) return [error, undefined]

        return [undefined, new AcademicSelectionEventDto(uuid, new Date(fired_at), academicSelectionElement!)]
    }
}