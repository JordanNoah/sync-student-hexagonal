import InscriptionAcademicProgramEventDto from "./inscriptionAcademicProgram.event.dto";
import InscriptionIntroductoryModuleEventDto from "./inscriptionIntroductoryModule.event.dto";

export default class InscriptionElementEventDto {
    constructor(
        public uuid: string,
        public studentUuid: string,
        public academicProgram: InscriptionAcademicProgramEventDto,
        public introductoryModule: InscriptionIntroductoryModuleEventDto | null,
        public institutionAbbreviation: string,
        public modality: string,
        public status: string,
        public contentLanguage: string,
        public createdAt: Date,
        public registeredAt: Date,
        public programStartedAt: Date,
        public programFinishedAt: Date,
        public extensionFinishedAt: Date,
    ){}

    static registered(object: { [key: string]: any }): [string?, InscriptionElementEventDto?] {
        const {uuid, student_uuid, academic_program, introductory_module, institution_abbreviation, modality, status, content_language, created_at, registered_at, program_started_at, program_finished_at, extension_finished_at} = object
        const messageErrorComplement = 'missing in inscription structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!student_uuid) return [`student_uuid ${messageErrorComplement}`, undefined]
        if (!academic_program) return [`academic_program ${messageErrorComplement}`, undefined]
        if (!institution_abbreviation) return [`institution_abbreviation ${messageErrorComplement}`, undefined]
        if (!modality) return [`modality ${messageErrorComplement}`, undefined]
        if (!status) return [`status ${messageErrorComplement}`, undefined]
        if (!content_language) return [`content_language ${messageErrorComplement}`, undefined]
        if (!created_at) return [`created_at ${messageErrorComplement}`, undefined]
        if (!registered_at) return [`registered_at ${messageErrorComplement}`, undefined]
        if (!program_started_at) return [`program_started_at ${messageErrorComplement}`, undefined]
        if (!program_finished_at) return [`program_finished_at ${messageErrorComplement}`, undefined]
        if (!extension_finished_at) return [`extension_finished_at ${messageErrorComplement}`, undefined]

        const [error, academicProgram] = InscriptionAcademicProgramEventDto.create(academic_program)
        if (error) return [error, undefined]

        let introductoryModuleDto: InscriptionIntroductoryModuleEventDto | null = null
        if (introductory_module) {
            const [error, introductoryModule] = InscriptionIntroductoryModuleEventDto.create(introductory_module)
            if (error) return [error, undefined]
            introductoryModuleDto = introductoryModule!
        }

        return [
            undefined, 
            new InscriptionElementEventDto(
                uuid, 
                student_uuid, 
                academicProgram!, 
                introductoryModuleDto, 
                institution_abbreviation, 
                modality, 
                status, 
                content_language, 
                new Date(created_at), 
                new Date(registered_at), 
                new Date(program_started_at), 
                new Date(program_finished_at), 
                new Date(extension_finished_at)
            )
        ]
    }
}