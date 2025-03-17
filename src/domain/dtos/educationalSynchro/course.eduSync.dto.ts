export default class CoursesEduSyncDto {
    constructor(
        public existingCourses: CoursesUuidDto[],
        public missingCourse: string[]
    ) {}

    static create(object: { [key: string]: any }): [string?, CoursesEduSyncDto?] {
        const {existCourse, missingCourse} = object;
        
        if (!existCourse || !missingCourse) {
            return ['missing properties', undefined];
        }

        const courses: CoursesUuidDto[] = [];
        for (const element of existCourse) {
            const [error, course] = CoursesUuidDto.create(element);
            if (error) {
                return [error, undefined];
            }
            courses.push(course!);
        }

        return [undefined, new CoursesEduSyncDto(courses, missingCourse)];
    }
}

export class CoursesUuidDto {
    constructor(
        public id: number,
        public externalId: number,
        public institutionId: number,
        public name: string,
        public shortName: string | null,
        public idNumber: string | null,
        public startDate: number | null,
        public endDate: number,
        public createdAt?: string | null,
        public updatedAt?: string | null,
        public deletedAt?: string | null,
        public uuid?: string | null
    ) {}

    static create(object: { [key: string]: any }): [string?, CoursesUuidDto?] {
        const {
            id,
            external_id,
            institution_id,
            name,
            short_name,
            id_number,
            start_date,
            end_date,
            created_at,
            updated_at,
            deleted_at,
            uuid
        } = object;

        return [undefined, new CoursesUuidDto(
            id,
            external_id,
            institution_id,
            name,
            short_name,
            id_number,
            start_date,
            end_date,
            created_at,
            updated_at,
            deleted_at,
            uuid
        )];
    }
}