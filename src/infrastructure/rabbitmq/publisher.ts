import { RabbitMQMessageDto } from 'rabbitmq-resilience';
import {RabbitMQR} from './index'
import StudentSynchronizedDto from '@/domain/dtos/rabbitmq/studentSynchronized.dto';
import { MessageFieldsDto, MessagePropertiesDto } from 'rabbitmq-resilience/dist/domain/dtos/eventManager';
import appConfig from '@/shared/appConfig';

export default class RabbitMqPublisher {
    public publishStudentSynchronized(studentSynchronizedDto:StudentSynchronizedDto) {
        const message = new RabbitMQMessageDto(
            Buffer.from(JSON.stringify(studentSynchronizedDto)),
            new MessageFieldsDto(
                0,
                false,
                appConfig.RABBIT_EXCHANGE,
                appConfig.RABBIT_ROUTING_KEY,
            ),
            this.basicHeaders('teaching-action.students-academic-synchronization.student_synchronized')
        )
        this.publishMessage(message)
    }

    public async publishMessage(message: RabbitMQMessageDto) {
        await RabbitMQR.pubishEvent(message)
    }

    public basicHeaders(messageType:string): MessagePropertiesDto {
        return new MessagePropertiesDto(
            'application/json',
            'utf-8',
            undefined,
            2,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            crypto.randomUUID(),
            messageType,
            undefined,
            appConfig.APPID,
            undefined
        )
    }
}