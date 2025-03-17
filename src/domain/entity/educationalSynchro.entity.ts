export class StudentEntity {
    constructor(
        public username: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public id?: number | null,
        public idnumber?: string,
        public uuid?: string,
    ){}

    static create(object: { [key: string]: any}): StudentEntity {
        return new StudentEntity(
            object.username,
            object.password,
            object.first_name,
            object.last_name,
            object.email,
            object.external_id,
            object.id_number,
            object.id_number
        )
    }
}