import {RabbitMQResilience} from 'rabbitmq-resilience';
import {rabbitMQResilienceConfig} from "@/infrastructure/rabbitmq/rabbitMQResilienceConfig";


export const RabbitMQR = RabbitMQResilience.initialize(rabbitMQResilienceConfig);