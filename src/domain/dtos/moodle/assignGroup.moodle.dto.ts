export default class AssignGroupMoodleDto {
    constructor(
        public groupid: number,
        public userid: number
    ) {}

    static create(object: { [key: string]: any }): AssignGroupMoodleDto {
        return new AssignGroupMoodleDto(
            object.groupid,
            object.userid
        );
    }
}