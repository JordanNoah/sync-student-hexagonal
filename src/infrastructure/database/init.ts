import { CustomError } from "@/domain/errors/custom.error"
import { 
    AcademicPeriodSequelize,
    AcademicSelectionSequelize,
    DegreeSequelize,
    EnrollmentSequelize,
    InscriptionSequelize,
    InstitutionSequelize
} from "./models"

export const DbSequelize = async () => {
    try {
        // Code to connect to the database
        await AcademicPeriodSequelize.sync()
        await AcademicSelectionSequelize.sync()
        await DegreeSequelize.sync()
        await EnrollmentSequelize.sync()
        await InscriptionSequelize.sync()
        await InstitutionSequelize.sync()
    }catch (error: any) {
        throw CustomError.internalServer(error)
    }
}