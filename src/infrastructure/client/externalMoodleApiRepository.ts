import { Axios } from "./axios";
import InstitutionEntity from "@/domain/entity/institution.entity";
import UnenrollmentMoodleDto from "@/domain/dtos/moodle/unenrollment.moodle.dto";
import GroupMoodleDto from "@/domain/dtos/moodle/group.moodle.dto";
import AssignGroupMoodleDto from "@/domain/dtos/moodle/assignGroup.moodle.dto";

export class ExternalMoodleApiRepository {
    private readonly axios: Axios;
    private readonly institution: InstitutionEntity;
    constructor(institution: InstitutionEntity) {
        this.axios = Axios.getInstance(`${institution.website}${institution.restPath}`)
        this.institution = institution
    }

    public async getUser(username: string): Promise<any> {
        const body = this.getBasicBody()
        body.wsfunction = 'core_user_get_users_by_field'
        body.field = 'username'
        body.values = [username]
        return await this.axios.post(undefined, body)
    }

    public async enrollUser(enrollmentMoodleDto: any[]): Promise<any> {
        const body = this.getBasicBody()
        body.wsfunction = 'enrol_manual_enrol_users'
        body.enrolments = enrollmentMoodleDto
        
        return await this.axios.post(undefined, body)
    }

    public async unenrollUser(unenrollmentMoodleDto: UnenrollmentMoodleDto[]): Promise<any> {
        const body = this.getBasicBody()
        body.wsfunction = 'enrol_manual_unenrol_users'
        body.enrolments = JSON.parse(JSON.stringify(unenrollmentMoodleDto))
        return await this.axios.post(undefined, body)
    }

    public async createGroups(groupMoodleDto: GroupMoodleDto[]): Promise<any> {
        const body = this.getBasicBody()
        body.wsfunction = 'core_group_create_groups'
        body.groups = JSON.parse(JSON.stringify(groupMoodleDto))
        return await this.axios.post(undefined, body)
    }

    public async assignUserToGroup(groupMoodleDto: AssignGroupMoodleDto[]): Promise<any> {
        const body = this.getBasicBody()
        body.wsfunction = 'core_group_add_group_members'
        body.members = JSON.parse(JSON.stringify(groupMoodleDto))
        return await this.axios.post(undefined, body)
    }

    public async createStudent(studentEntity: any): Promise<any> {
        const body = this.getBasicBody()
        body.wsfunction = 'core_user_create_users'
        body.users = JSON.parse(JSON.stringify([studentEntity]))
        return await this.axios.post(undefined, body)
    }

    public async updateStudent(studentEntity: any): Promise<any> {
        const body = this.getBasicBody()
        body.wsfunction = 'core_user_update_users'
        body.users = JSON.parse(JSON.stringify([studentEntity]))
        return await this.axios.post(undefined, body)
    }

    public getBasicBody(): { [key: string]: any } {
        return {
            'moodlewsrestformat': 'json',
            'wstoken': this.institution.token
        }
    }
}
