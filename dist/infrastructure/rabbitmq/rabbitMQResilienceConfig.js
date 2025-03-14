"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQResilienceConfig = void 0;
const config_1 = require("../../infrastructure/rabbitmq/config");
const eventsToProcess_1 = require("../../infrastructure/rabbitmq/eventsToProcess");
const sequelize_1 = require("../../infrastructure/database/sequelize");
const appConfig_1 = __importDefault(require("../../shared/appConfig"));
exports.rabbitMQResilienceConfig = {
    rabbitMQConfigConnect: config_1.config,
    queue: appConfig_1.default.RABBIT_QUEUE,
    routingKey: appConfig_1.default.RABBIT_ROUTING_KEY,
    exchange: appConfig_1.default.RABBIT_EXCHANGE,
    typeExchange: appConfig_1.default.RABBIT_TYPE_EXCHANGE,
    prefetch: appConfig_1.default.RABBIT_PREFETCH,
    directExchange: appConfig_1.default.RABBIT_DIRECT_EXCHANGE,
    typeDirectExchange: appConfig_1.default.RABBIT_TYPE_DIRECT_EXCHANGE,
    retryQueue: appConfig_1.default.RABBIT_RETRY_QUEUE,
    retryRoutingKey: appConfig_1.default.RABBIT_RETRY_ROUTING_KEY,
    retryEndpoint: appConfig_1.default.RABBIT_RETRY_ENDPOINT,
    deadLetterQueue: appConfig_1.default.RABBIT_DEAD_LETTER_QUEUE,
    deadLetterRoutingKey: appConfig_1.default.RABBIT_DEAD_LETTER_ROUTING_KEY,
    messageTTL: appConfig_1.default.RABBIT_MESSAGE_TTL,
    eventResilienceHandlerConfig: {
        immediateRetryAttempts: 5,
        delayedRetryAttempts: 3,
        delayInMs: 0,
    },
    eventsToProcess: eventsToProcess_1.eventsToProcess,
    sequelizeConnection: sequelize_1.sequelize,
};
