import EnrollmentElementEventDto from "./enrollmentElement.event.dto";

export default class EnrollmentEventDto {
    constructor(
        public uuid: string,
        public firedAt: Date,
        public enrollment: EnrollmentElementEventDto
    ){}

    static create(object: { [key: string]: any }): [string?, EnrollmentEventDto?] {
        const {uuid, fired_at, enrollment} = object
        const messageErrorComplement = 'missing in enrollment structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!fired_at) return [`fired_at ${messageErrorComplement}`, undefined]
        if (!enrollment) return [`enrollment ${messageErrorComplement}`, undefined]

        const [error, enrollmentElement] = EnrollmentElementEventDto.registered(enrollment)
        if (error) return [error, undefined]

        return [undefined, new EnrollmentEventDto(uuid, new Date(fired_at), enrollmentElement!)]
    }
}