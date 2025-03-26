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

    static fromExternal(userSgDto:UserSgDto, studentEntity:StudentEntity | null ): StudentToMoodleDto {
        return new StudentToMoodleDto(
            userSgDto.credentials[0].username.toLowerCase(),
            userSgDto.credentials[0].password,
            userSgDto.name,
            userSgDto.lastName,
            userSgDto.emails[0].email,
            userSgDto.uuid,
            studentEntity ? studentEntity.id! : undefined
        )
    }

}