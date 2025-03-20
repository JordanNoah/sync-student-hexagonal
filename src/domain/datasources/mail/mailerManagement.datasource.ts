import { CoursesUuidDto } from "@/domain/dtos/educationalSynchro/course.eduSync.dto";
import StudentToMoodleDto from "@/domain/dtos/moodle/student.moodle.dto";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import AcademicSelectionEntity from "@/domain/entity/academicSelection.entity";
import InstitutionEntity from "@/domain/entity/institution.entity";

export abstract class MailerManagmentDatasource {
    abstract notificationCNF(academicRecord: AcademicRecordEntity, programCourse: CoursesUuidDto, student: StudentToMoodleDto, institution: InstitutionEntity): Promise<void>;
}