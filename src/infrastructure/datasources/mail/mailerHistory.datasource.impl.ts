
import { MailerHistoryDatasource } from "@/domain/datasources/mail/mailerHistory.datasource";
import MailerHistoryDto from "@/domain/dtos/mail/mailerHistory.dto";
import { MailerHistoryEntity } from "@/domain/entity/mail/mailerHistory.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { MailerHistorySequelize, MailerNotificationStatus } from "@/infrastructure/database/models/MailerHistory";

export class MailerHistoryDatasourceImpl implements MailerHistoryDatasource {
    async register (mailerHistoryDto: MailerHistoryDto): Promise<MailerHistoryEntity> {
        try {            
            const [mailerHistory] = await MailerHistorySequelize.findOrCreate({
                where: {
                    mailerNotificationId: mailerHistoryDto.mailerNotificationId,
                    studentUuid: mailerHistoryDto.studentUuid
                },
                defaults: {
                    uuid: mailerHistoryDto.uuid ?? crypto.randomUUID(),
                    mailerNotificationId: mailerHistoryDto.mailerNotificationId,
                    studentUuid: mailerHistoryDto.studentUuid,
                    subject: mailerHistoryDto.subject,
                    to: mailerHistoryDto.to,
                    cc: mailerHistoryDto.cc,
                    cco: mailerHistoryDto.cco,
                    body: mailerHistoryDto.body,
                    status: mailerHistoryDto.status,
                    attempts: mailerHistoryDto.attempts,
                    sentAt: mailerHistoryDto.sentAt
                }
            })
            
            return MailerHistoryEntity.fromRow(mailerHistory);
        } catch (error: any) {
            console.log(error)
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error.message);
        }
    }

    async checkIfNotificationExists(studentUuid: string, mailerId: number): Promise<boolean> {
        try {
            const mailerHistory = await MailerHistorySequelize.findOne({
                where: {
                    studentUuid: studentUuid,
                    mailerNotificationId: mailerId
                }
            })
            return !!mailerHistory;
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error.message);
        }
    }

    async updateStatus(uuid: string, status: MailerNotificationStatus): Promise<void> {
        try {
            await MailerHistorySequelize.update({
                status,
                sentAt: status === MailerNotificationStatus.SENT ? new Date(): undefined,
                body: null
            }, {
                where: { uuid }
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error.message);
        }
    }
}