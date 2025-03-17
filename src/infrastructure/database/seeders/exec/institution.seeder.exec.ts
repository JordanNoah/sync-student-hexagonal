import InstitutionSeederData from '../data/institution.seeder.data';
import { CustomError } from '@/domain/errors/custom.error';
import InstitutionDto from '@/domain/dtos/institution/institution.dto';
import InstitutionDatasourceImpl from '@/infrastructure/datasources/institution.datasource.impl';

export class InstitutionSeederExec {
    public async up() {
        try {
            const institutionSeeder = InstitutionSeederData;
            for (let institutionData of InstitutionSeederData) {
                const [error, institutionDto] = InstitutionDto.create(institutionData);
                if (error) throw CustomError.internalServer(error)
                const institution = institutionDto!
                await new InstitutionDatasourceImpl().register(institution)
            }
        } catch (error) {
            console.log(error)
        }
    }
}