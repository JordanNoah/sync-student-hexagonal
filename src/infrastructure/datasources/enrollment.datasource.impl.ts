import EnrollmentDatasource from "@/domain/datasources/enrollment.datasource";
import EnrollmentEventDto from "@/domain/dtos/enrollment/enrollment.event.dto";
import EnrollmentEntity from "@/domain/entity/enrollment.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { EnrollmentSequelize } from "../database/models";

export default class EnrollmentDatasourceImpl implements EnrollmentDatasource {
    async createUpdate(enrollmentEventDto: EnrollmentEventDto): Promise<EnrollmentEntity> {
        try {
            const [enrollmentDb, created] = await EnrollmentSequelize.findOrCreate({
                where: {
                    uuid: enrollmentEventDto.enrollment.uuid
                },
                defaults: {
                    uuid: enrollmentEventDto.enrollment.uuid,
                    studentUuid: enrollmentEventDto.enrollment.studentUuid,
                    inscriptionUuid: enrollmentEventDto.enrollment.inscriptionUuid,
                    programUuid: enrollmentEventDto.enrollment.academicProgram.programUuid,
                    programVersion: enrollmentEventDto.enrollment.academicProgram.version,
                    programVersionUuid: enrollmentEventDto.enrollment.academicProgram.programVersionUuid,
                    academicTermUuid: enrollmentEventDto.enrollment.academicTerm.uuid,
                }
            })

            if (!created){
                enrollmentDb.uuid = enrollmentEventDto.enrollment.uuid
                enrollmentDb.studentUuid = enrollmentEventDto.enrollment.studentUuid
                enrollmentDb.inscriptionUuid = enrollmentEventDto.enrollment.inscriptionUuid
                enrollmentDb.programUuid = enrollmentEventDto.enrollment.academicProgram.programUuid
                enrollmentDb.programVersion = enrollmentEventDto.enrollment.academicProgram.version
                enrollmentDb.programVersionUuid = enrollmentEventDto.enrollment.academicProgram.programVersionUuid
                enrollmentDb.academicTermUuid = enrollmentEventDto.enrollment.academicTerm.uuid
                await enrollmentDb.save()
                console.log("Enrollment record found, update applied instead...")
            }
            return EnrollmentEntity.fromRow(enrollmentDb)
        } catch (error) {
            CustomError.throwAnError(error)
            return Promise.reject(error);
        }
    }
}