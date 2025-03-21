export class StudentEnrollmentDto {
    constructor(
        //todo: add object for each field
        public student: string,
        public institution: string,
        public inscription: string,
        public campus: string,
    ){}
}