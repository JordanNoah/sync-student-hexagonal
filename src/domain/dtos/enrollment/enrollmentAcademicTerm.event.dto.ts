export default class EnrollmentAcademicTermEventDto {
    constructor(
        public uuid: string
    ){}

    static create(object: { [key: string]: any }): [string?, EnrollmentAcademicTermEventDto?] {
        const {uuid} = object
        const messageErrorComplement = 'missing in enrollment academic term structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]

        return [undefined, new EnrollmentAcademicTermEventDto(uuid)]
    }
}