import UserSgDto from "../dtos/sg/user.sg.dto";

export default abstract class SgDatasource {
    abstract getStudent(uuid:string): Promise<UserSgDto>;
}