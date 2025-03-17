export default class GroupMoodleDto {
    constructor(
        public courseid: number,
        public name: string,
        public idnumber: string,
        public description: string,
        public id?: number
    ) {}
    static create(object: { [key: string]: any }): GroupMoodleDto {
        return new GroupMoodleDto(
            object.courseid,
            object.name,
            object.idnumber,
            object.description,
            object.id
        );
    }
}