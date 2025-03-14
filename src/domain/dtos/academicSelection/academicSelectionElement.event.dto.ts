import AcademicSelectionCallEventDto from "./academicSelectionCall.event.dto";

export default class AcademicSelectionElementEventDto {
    constructor(
        public uuid: string,
        public enrollmentUuid: string,
        public academicElementUuid: string,
        public call?: AcademicSelectionCallEventDto,
        public startedAt?: Date,
        public finishedAt?: Date
    ){}

    static registered(object: { [key: string]: any }): [string?, AcademicSelectionElementEventDto?] {
        const {uuid, enrollment_uuid, academic_element_uuid, call} = object
        const messageErrorComplement = 'missing in academicSelectionElement structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!enrollment_uuid) return [`enrollment_uuid ${messageErrorComplement}`, undefined]
        if (!academic_element_uuid) return [`academic_element_uuid ${messageErrorComplement}`, undefined]
        if (call) {
            const [error, callElement] = AcademicSelectionCallEventDto.create(call)
            if (error) return [error, undefined]
            return [undefined, new AcademicSelectionElementEventDto(uuid, enrollment_uuid, academic_element_uuid, callElement)]
        }
        return [undefined, new AcademicSelectionElementEventDto(uuid, enrollment_uuid, academic_element_uuid)]
    }
}