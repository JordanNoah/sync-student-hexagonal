export default class UnenrollmentMoodleDto {
    constructor(
        public userid: number,   //The user that is going to be unenrolled
        public courseid: number,   //The course to unenrol the user from
        public roleid?: number //The user role Optional
    ) {}
}