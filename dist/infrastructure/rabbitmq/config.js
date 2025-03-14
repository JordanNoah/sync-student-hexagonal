"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const appConfig_1 = __importDefault(require("../../shared/appConfig"));
exports.config = {
    username: appConfig_1.default.RABBIT_USERNAME,
    password: appConfig_1.default.RABBIT_PASSWORD,
    protocol: appConfig_1.default.RABBIT_PROTOCOL,
    hostname: appConfig_1.default.RABBIT_HOSTNAME,
    port: Number(appConfig_1.default.RABBIT_PORT),
    vhost: appConfig_1.default.RABBIT_VHOST
};
