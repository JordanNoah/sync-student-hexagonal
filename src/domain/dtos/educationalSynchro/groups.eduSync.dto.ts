export default class GroupEduSyncDto {
    constructor(
        public existGroups: GroupElementEduSyncDto[],
        public missingGroups: MissingGroupEduSyncDto[]
    ){}

    static create(object: { [key: string]: any }): [string?, GroupEduSyncDto?] {
        const {
            existGroups,
            missingGroups
        } = object;

        if (!existGroups || !missingGroups) {
            return ['missing properties', undefined];
        }

        const groups: GroupElementEduSyncDto[] = [];
        for (const element of existGroups) {
            const [error, group] = GroupElementEduSyncDto.fromExternal(element);
            if (error) {
                return [error, undefined];
            }
            groups.push(group!);
        }

        const missing: MissingGroupEduSyncDto[] = [];
        for (const element of missingGroups) {
            const [error, missingGroup] = MissingGroupEduSyncDto.fromExternal(element);
            if (error) {
                return [error, undefined];
            }
            missing.push(missingGroup!);
        }

        return [undefined, new GroupEduSyncDto(groups, missing)];

    }
}

export class GroupElementEduSyncDto {
    constructor(
        public id: number,
        public externalId: number,
        public idNumber: string,
        public name: string,
        public description: string,
        public courseId: number,
        public institutionId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null
    ){}

    static fromExternal(object: { [key: string]: any }): [string?, GroupElementEduSyncDto?] {
        const {
            id,
            externalId,
            idNumber,
            name,
            description,
            courseId,
            institutionId,
            createdAt,
            updatedAt,
            deletedAt
        } = object;

        return [undefined, new GroupElementEduSyncDto(
            id,
            externalId,
            idNumber,
            name,
            description,
            courseId,
            institutionId,
            new Date(createdAt),
            new Date(updatedAt),
            new Date(deletedAt)
        )];
    }
}

export class MissingGroupEduSyncDto {
    constructor(
        public groupIdNumber:string,
        public courseId: number,
    ){}

    static fromExternal(object: { [key: string]: any }): [string?, MissingGroupEduSyncDto?] {
        const {
            groupIdNumber,
            courseId
        } = object;

        return [undefined, new MissingGroupEduSyncDto(
            groupIdNumber,
            courseId
        )];
    }
}