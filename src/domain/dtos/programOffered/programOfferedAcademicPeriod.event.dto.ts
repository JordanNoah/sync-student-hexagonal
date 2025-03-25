export default class ProgramOfferedAcademicPeriodEventDto {
    constructor(
        public uuid: string,
        public namePeriod: string,
        public startDate: Date,
        public endDate: Date | null,
    ){}

    static create(object: { [key: string]: any }): [string?, ProgramOfferedAcademicPeriodEventDto?] {
        const {uuid, start_date, end_date} = object
        
        const messageErrorComplement = 'missing in programOfferedAcademicPeriod structure'
        if (!uuid) return [`uuid ${messageErrorComplement}`, undefined]
        if (!object['name']) return [`name ${messageErrorComplement}`, undefined]
        if (!start_date) return [`start_date ${messageErrorComplement}`, undefined]

        return [undefined, new ProgramOfferedAcademicPeriodEventDto(
            uuid, 
            object['name'], 
            new Date(start_date), 
            end_date ? new Date(end_date): null
        )]
    }
}