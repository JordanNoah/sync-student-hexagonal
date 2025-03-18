import { AxiosRequestConfig } from "axios";
import InstitutionEntity from "@/domain/entity/institution.entity";
import AppConfig from "@/shared/appConfig";
import { Axios } from "./axios";
import GroupMoodleDto from "@/domain/dtos/moodle/group.moodle.dto";
import StudentToMoodleDto from "@/domain/dtos/moodle/student.moodle.dto";
import GroupCheckEduSyncDto from "@/domain/dtos/educationalSynchro/groupCheck.eduSync.dto";

export class ExternalEducationalSyncApiRepository {
    private readonly axios: Axios;
    private readonly url: string;

    constructor() {
        this.axios = Axios.createApplicationJsonInstance(AppConfig.EDUCATIONAL_SYNC_URL)
        this.url = AppConfig.EDUCATIONAL_SYNC_URL
    }

    public async getAllUsers(): Promise<any> {
        const webServiceUrl = this.url + '/api/user'
        return await this.axios.get(webServiceUrl)
    }

    public async getStudentByUuidAndInstitutionAbbr(uuid:string, institution: InstitutionEntity): Promise<any> {
        //Modify route to follow the camel case notation (idnumber & institutionabbr)
        const webServiceUrl = this.url + '/api/user/idnumber-institutionabbr'
        const params = new URLSearchParams()
        params.append('uuid', uuid)
        params.append('institutionAbbr', institution.abbreviation)
        params.append('modality', institution.modality)
        return await this.axios.get(webServiceUrl, { params })
    }

    public async getCourseByUuid(content: AxiosRequestConfig): Promise<any> {        
        const webServiceUrl = this.url + '/api/course/uuid'
        return await this.axios.post(webServiceUrl, {
            uuid: content.params.uuid,
        })
    }

    public async getUserEnrollments(student: StudentToMoodleDto, institution: InstitutionEntity): Promise<any> {
        const webServiceUrl = this.url + '/api/enrollment'
        const params = new URLSearchParams()
        params.append('userId', student.id!.toString())
        params.append('institutionAbbr', institution.abbreviation)
        params.append('institutionModality', institution.modality)
        return await this.axios.get(webServiceUrl, { params })
    }

    public async getCoursesByUuidsAndInstitutionAbbr(uuids: string[], institutionAbbr: string, institutionModality: string): Promise<any> {
        const webServiceUrl = this.url + '/api/course/idNumbers-institution'

        const params = new URLSearchParams()
        params.append('idNumbers', uuids.join(','))
        params.append('institutionAbbr', institutionAbbr)
        params.append('modality', institutionModality)
        params.append('onlyUuid', '1')
        return await this.axios.get(webServiceUrl, { params })
    }

    public async getGroupsByIdnumbersAndCourseId(groups: GroupCheckEduSyncDto[]): Promise<any> {
        const webServiceUrl = this.url + '/api/group/search-existence'
        return await this.axios.post(webServiceUrl, groups)
    }

    public async createGroups(groups: GroupMoodleDto[],institutionEntity:InstitutionEntity): Promise<any> {
        const webServiceUrl = this.url + '/api/group/bulk'
        return await this.axios.post(webServiceUrl, {
            groups:groups,
            campus: {
                institutionAbbreviation: institutionEntity.abbreviation,
                modality: institutionEntity.modality
            }
        })
    }
}
