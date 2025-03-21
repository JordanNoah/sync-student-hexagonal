import { StudentEntity } from "@/domain/entity/educationalSynchro.entity";
import UserSgDto from "../sg/user.sg.dto";

export default class StudentToMoodleDto {
    constructor(
        public username: string,
        public password: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public idnumber: string,
        public id?: number,
        public isCreated?: boolean,
    ){}

    static fromExternal(userSgDto:UserSgDto | null, studentEntity:StudentEntity | null ): StudentToMoodleDto {
        return new StudentToMoodleDto(
            userSgDto?.credentials[0]?.username.toLowerCase() || "fakeUsername",
            userSgDto?.credentials[0]?.password || "fakePassword",
            userSgDto?.name || "Fake",
            userSgDto?.lastName || "User",
            userSgDto?.emails[0]?.email || "fakeuser@example.com",
            userSgDto?.uuid || "fakeUUID",
            studentEntity ? studentEntity.id! : undefined
        )
    }

}