import { dateToTimeStamp } from "@/shared/utils";
import StudentToMoodleDto from "./student.moodle.dto";
import { CoursesUuidDto } from "../educationalSynchro/course.eduSync.dto";


export default class EnrollmentMoodleDto {
    constructor(
        public roleid: number, //Role to assign to the user
        public userid: number, //The user that is going to be enrolled
        public courseid: number, //The course to enrol the user role in
        public timestart?: number, //Timestamp when the enrolment start
        public timeend?: number, //Timestamp when the enrolment end
        public suspend?: number //set to 1 to suspend the enrolment
    ){}

    static fromCourseDto(courseDto:CoursesUuidDto, studentEntity: StudentToMoodleDto, startDate?: string | Date, endDate?: string | Date): EnrollmentMoodleDto {
        //TODO: revisar si el roleid es correcto
        //TODO: revisar si el timestart y timeend son correctos
        const startDateConvert = startDate ? dateToTimeStamp(startDate): undefined;
        const endDateConvert = endDate ? dateToTimeStamp(endDate): undefined;
        return new EnrollmentMoodleDto(5, studentEntity.id!, courseDto.externalId, startDateConvert, endDateConvert, 0);
    }

    toJSON() {
        return {
            roleid: this.roleid,
            userid: this.userid,
            courseid: this.courseid,
            timestart: this.timestart,
            timeend: this.timeend,
            suspend: this.suspend
        };
    }
}