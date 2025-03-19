"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinutes = addMinutes;
exports.getOnlyYearAndMonth = getOnlyYearAndMonth;
exports.dateToTimeStamp = dateToTimeStamp;
const custom_error_1 = require("@/domain/errors/custom.error");
const appConfig_1 = __importDefault(require("./appConfig"));
function addMinutes(date) {
    let dateFinal = null;
    if (date instanceof Date) {
        dateFinal = date;
    }
    else {
        dateFinal = new Date(date);
    }
    if (!dateFinal) {
        throw custom_error_1.CustomError.internalServer('Date is not valid');
    }
    return new Date(dateFinal.getTime() + appConfig_1.default.TRANSACTION_DELAY_MINUTES * 60000);
}
function getOnlyYearAndMonth(date) {
    let dateToCheck = null;
    if (typeof date === 'string') {
        dateToCheck = new Date(date);
    }
    else {
        dateToCheck = date;
    }
    if (!dateToCheck)
        return null;
    return `${dateToCheck.getFullYear()}-${dateToCheck.getMonth() + 1}`;
}
function dateToTimeStamp(date) {
    if (date instanceof Date) {
        return Math.floor(date.getTime() / 1000);
    }
    else {
        return Math.floor(new Date(date).getTime() / 1000);
    }
}
