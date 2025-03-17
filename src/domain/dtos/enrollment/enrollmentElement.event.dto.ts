import EnrollmentAcademicProgramEventDto from "./enrollmentAcademicProgram.event.dto";
import EnrollmentAcademicTermEventDto from "./enrollmentAcademicTerm.event.dto";

export default class EnrollmentElementEventDto {
    constructor(
        public uuid: string,
        public studentUuid?: string,
        public inscriptionUuid?: string,
        public academicProgram?: EnrollmentAcademicProgramEventDto,
        public academicTerm?: EnrollmentAcademicTermEventDto
    ){}

    static registered(object: { [key: string]: any }): [string?, EnrollmentElementEventDto?] {
        const {uuid, student_uuid, inscription_uuid, academic_program, academic_term} = object
        const messageErrorComplement = 'missing in enrollment structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!student_uuid) return [`student_uuid ${messageErrorComplement}`, undefined]
        if (!inscription_uuid) return [`inscription_uuid ${messageErrorComplement}`, undefined]
        if (!academic_program) return [`academic_program ${messageErrorComplement}`, undefined]
        if (!academic_term) return [`academic_term ${messageErrorComplement}`, undefined]

        const [error, academicProgram] = EnrollmentAcademicProgramEventDto.create(academic_program)
        if (error) return [error, undefined]

        const [errorAcademicTerm, academicTerm] = EnrollmentAcademicTermEventDto.create(academic_term)
        if (errorAcademicTerm) return [errorAcademicTerm, undefined]

        return [
            undefined, 
            new EnrollmentElementEventDto(
                uuid, 
                student_uuid, 
                inscription_uuid, 
                academicProgram!, 
                academicTerm!
            )
        ]
    }

    static changeStatus(object: { [key: string]: any }): [string?, EnrollmentElementEventDto?] {
        const {uuid} = object
        const messageErrorComplement = 'missing in enrollment structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        return [undefined, new EnrollmentElementEventDto(
            uuid
        )]
    }
}