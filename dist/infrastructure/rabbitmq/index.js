"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQR = void 0;
const rabbitmq_resilience_1 = require("rabbitmq-resilience");
const rabbitMQResilienceConfig_1 = require("../../infrastructure/rabbitmq/rabbitMQResilienceConfig");
exports.RabbitMQR = rabbitmq_resilience_1.RabbitMQResilience.initialize(rabbitMQResilienceConfig_1.rabbitMQResilienceConfig);
