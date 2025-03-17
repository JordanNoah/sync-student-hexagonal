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

export function getOnlyYearAndMonth(date: Date|string): string | null {
    let dateToCheck: null|Date = null
    if (typeof date === 'string') {
        dateToCheck = new Date(date)
    } else {
        dateToCheck = date
    }
    if (!dateToCheck) return null
    return `${dateToCheck.getFullYear()}-${dateToCheck.getMonth() + 1}`
}

export function dateToTimeStamp(date: string | Date): number {
    if (date instanceof Date) {
        return Math.floor(date.getTime() / 1000)
    } else {
        return Math.floor(new Date(date).getTime() / 1000)
    }
}