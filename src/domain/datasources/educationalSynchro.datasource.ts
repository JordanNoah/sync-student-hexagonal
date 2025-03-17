import { StudentEntity } from "../entity/educationalSynchro.entity";

export default abstract class EducationalSynchroDatasource {
    abstract getStudent(uuid:string): Promise<StudentEntity | null>;
}