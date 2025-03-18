import SgDatasource from "@/domain/datasources/sg.datasource";
import { CustomError } from "@/domain/errors/custom.error";
import { ExternalAcademicRecordApiRepository } from "../client/externalAcademicRecordApiRepository";
import UserSgDto from "@/domain/dtos/sg/user.sg.dto";

export default class SgDatasourceImpl extends SgDatasource {
    async getStudent(uuid: string): Promise<UserSgDto> {
        try {
            const sgResponse = await new ExternalAcademicRecordApiRepository().getUserByUuid(uuid)
            const [error, userSgDto] = UserSgDto.create(sgResponse.data)
            if (error){
                throw CustomError.internalServer(error)
            }
            
            return userSgDto!
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}