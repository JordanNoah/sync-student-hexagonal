import EducationalSynchroDatasource from "@/domain/datasources/educationalSynchro.datasource";
import CourseUuid from "@/domain/dtos/cron/courseUuid.dto";
import { StudentEntity } from "@/domain/entity/educationalSynchro.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { ExternalEducationalSyncApiRepository } from "../client/externalEducationalSyncApiRepository";
import InstitutionEntity from "@/domain/entity/institution.entity";
import CoursesEduSyncDto, { CoursesUuidDto } from "@/domain/dtos/educationalSynchro/course.eduSync.dto";
import GroupCheckEduSyncDto from "@/domain/dtos/educationalSynchro/groupCheck.eduSync.dto";
import GroupEduSyncDto, { GroupElementEduSyncDto, MissingGroupEduSyncDto } from "@/domain/dtos/educationalSynchro/groups.eduSync.dto";
import GroupMoodleDto from "@/domain/dtos/moodle/group.moodle.dto";

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

    async createGroups(groups: MissingGroupEduSyncDto[], institution:InstitutionEntity, courseUuids: CoursesUuidDto[]): Promise<GroupElementEduSyncDto[]> {
        try {
            const moodleGroups = groups.map(group => {
                return GroupMoodleDto.create({
                    courseid: courseUuids.find(course => course.id === group.courseId)?.externalId,
                    name: group.groupIdNumber,
                    idnumber: group.groupIdNumber,
                    description: group.groupIdNumber,
                })
            })
            
            const createdGroups = await new ExternalEducationalSyncApiRepository().createGroups(moodleGroups, institution)           
            
            return createdGroups.data.map((group:any) => GroupElementEduSyncDto.fromExternal(group))
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }

    async getGroups(groupCheckEduSyncDto: GroupCheckEduSyncDto[]): Promise<GroupEduSyncDto> {
        try {
            const response = await new ExternalEducationalSyncApiRepository().getGroupsByIdnumbersAndCourseId(groupCheckEduSyncDto)
            const [error, groupEduSyncDto] = GroupEduSyncDto.create(response.data)
            if (error){
                throw CustomError.internalServer(error)
            }
            
            return groupEduSyncDto!
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
    async getCourse(uuid: string, institution: InstitutionEntity): Promise<CoursesUuidDto | null> {
        return null    
    }
}