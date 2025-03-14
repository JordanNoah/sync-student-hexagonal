import { CustomError } from "@/domain/errors/custom.error";
import appConfig from "./appConfig";

export function addMinutes(date: string | Date): Date {
    let dateFinal: Date | null = null
    if (date instanceof Date) {
        dateFinal = date
    } else {
        dateFinal = new Date(date)
    }
    
    if (!dateFinal) {
        throw CustomError.internalServer('Date is not valid')
    }
    
    return new Date(dateFinal.getTime() + appConfig.TRANSACTION_DELAY_MINUTES * 60000);
}