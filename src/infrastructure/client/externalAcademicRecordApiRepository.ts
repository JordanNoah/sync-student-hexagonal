import { Axios } from "./axios";
import AppConfig from "@/shared/appConfig";

export class ExternalAcademicRecordApiRepository {
    private readonly axios: Axios;
    private readonly url: string;
    constructor() {
        this.axios = Axios.createApplicationJsonInstance(AppConfig.ACADEMIC_RECORD_API_URL)
        this.url = AppConfig.ACADEMIC_RECORD_API_URL
    }

    public async getUserByUuid(uuid: string): Promise<any> {
        const studentUrl = `${this.url}/students/${uuid}`;
        return await this.axios.get(studentUrl)
    }
}
