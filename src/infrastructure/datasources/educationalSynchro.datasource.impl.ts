import EducationalSynchroDatasource from "@/domain/datasources/educationalSynchro.datasource";
import CourseUuid from "@/domain/dtos/cron/courseUuid.dto";
import { StudentEntity } from "@/domain/entity/educationalSynchro.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { ExternalEducationalSyncApiRepository } from "../client/externalEducationalSyncApiRepository";
import InstitutionEntity from "@/domain/entity/institution.entity";
import CoursesEduSyncDto from "@/domain/dtos/educationalSynchro/course.eduSync.dto";
import GroupCheckEduSyncDto from "@/domain/dtos/educationalSynchro/groupCheck.eduSync.dto";

export default class EducationalSynchroDatasourceImpl implements EducationalSynchroDatasource {
    async getStudent(uuid: string, institution: InstitutionEntity): Promise<StudentEntity | null> {
        try {
            const response = await new ExternalEducationalSyncApiRepository().getStudentByUuidAndInstitutionAbbr(uuid, institution)
            const student = response.data            
            if (!student) return null

            return StudentEntity.create(student)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async getCourses(coursesUuid: CourseUuid[], institution:InstitutionEntity): Promise<CoursesEduSyncDto> {
        try {            
            const response = await new ExternalEducationalSyncApiRepository().getCoursesByUuidsAndInstitutionAbbr(coursesUuid.map((coursesUuid) => coursesUuid.uuid), institution.abbreviation, institution.modality)
            const [error, courses] = CoursesEduSyncDto.create(response.data)
            if (error){
                throw CustomError.internalServer(error)
            }
            
            return courses!
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async createGroups(groups: GroupCheckEduSyncDto[],institution:InstitutionEntity): Promise<GroupCheckEduSyncDto[]> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async getGroups(groupCheckEduSyncDto: GroupCheckEduSyncDto[]): Promise<any> {
        try {
            const response = await new ExternalEducationalSyncApiRepository().getGroupsByIdnumbersAndCourseId(groupCheckEduSyncDto)
            return response.data
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

}