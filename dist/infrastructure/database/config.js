"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const appConfig_1 = __importDefault(require("@/shared/appConfig"));
exports.config = {
    host: appConfig_1.default.DB_HOST,
    username: appConfig_1.default.DB_USERNAME,
    password: appConfig_1.default.DB_PASSWORD,
    logging: false,
    port: appConfig_1.default.DB_PORT,
    database: appConfig_1.default.DB_NAME,
    dialect: 'mysql'
};
