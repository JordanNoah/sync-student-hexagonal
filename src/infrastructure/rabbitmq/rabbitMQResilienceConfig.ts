import {RabbitMQResilienceConfig} from 'rabbitmq-resilience';
import {config} from "@/infrastructure/rabbitmq/config";
import {eventsToProcess} from "@/infrastructure/rabbitmq/eventsToProcess";
import {sequelize} from "@/infrastructure/database/sequelize";
import appConfig from "@/shared/appConfig";

export const rabbitMQResilienceConfig: RabbitMQResilienceConfig = {
    rabbitMQConfigConnect: config,
    queue: appConfig.RABBIT_QUEUE,
    routingKey: appConfig.RABBIT_ROUTING_KEY,
    exchange: appConfig.RABBIT_EXCHANGE,
    typeExchange: appConfig.RABBIT_TYPE_EXCHANGE,
    prefetch: appConfig.RABBIT_PREFETCH,
    directExchange: appConfig.RABBIT_DIRECT_EXCHANGE,
    typeDirectExchange: appConfig.RABBIT_TYPE_DIRECT_EXCHANGE,
    retryQueue: appConfig.RABBIT_RETRY_QUEUE,
    retryRoutingKey: appConfig.RABBIT_RETRY_ROUTING_KEY,
    retryEndpoint: appConfig.RABBIT_RETRY_ENDPOINT,
    deadLetterQueue: appConfig.RABBIT_DEAD_LETTER_QUEUE,
    deadLetterRoutingKey: appConfig.RABBIT_DEAD_LETTER_ROUTING_KEY,
    messageTTL: appConfig.RABBIT_MESSAGE_TTL,
    eventResilienceHandlerConfig: {
        immediateRetryAttempts: 5,
        delayedRetryAttempts: 3,
        delayInMs: 0,
    },
    eventsToProcess: eventsToProcess,
    sequelizeConnection: sequelize,
};