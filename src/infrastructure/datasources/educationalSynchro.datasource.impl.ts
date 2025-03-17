import EducationalSynchroDatasource from "@/domain/datasources/educationalSynchro.datasource";
import { StudentEntity } from "@/domain/entity/educationalSynchro.entity";
import { CustomError } from "@/domain/errors/custom.error";

export default class EducationalSynchroDatasourceImpl implements EducationalSynchroDatasource {
    async getStudent(uuid: string): Promise<StudentEntity | null> {
        try {
            const reponse = await fetch(`http://localhost:3000/students/${uuid}`)
            const student = await reponse.json()
            if (!student) return null

            return StudentEntity.create(response.data)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}