export default class CourseUuid {
    constructor(
        public type: string,
        public uuid: string,
        public startDate?: Date,
        public endDate?: Date,
        public academicPeriod?: string,
    ){}
}