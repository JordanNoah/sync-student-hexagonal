"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinutes = addMinutes;
const custom_error_1 = require("../domain/errors/custom.error");
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
