import { MailerNotificationDatasource } from "@/domain/datasources/mail/mailerNotification.datasource";
import MailerNotificationDto from "@/domain/dtos/mail/mailerNotification.dto";
import { MailerNotificationEntity } from "@/domain/entity/mail/mailerNotification.entity";
import { CustomError } from "@/domain/errors/custom.error";
import { MailerNotificationSequelize } from "@/infrastructure/database/models/MailerNotification";

export class MailerNotificationDatasourceImpl extends MailerNotificationDatasource {
    async register(mailerNotificationDto: MailerNotificationDto): Promise<MailerNotificationEntity> {
        try {
            const [mailerNotification, created] = await MailerNotificationSequelize.findOrCreate({
                where: {
                    abbreviation: mailerNotificationDto.abbreviation
                },
                defaults: {
                    name: mailerNotificationDto.name,
                    abbreviation: mailerNotificationDto.abbreviation,
                    subject: mailerNotificationDto.subject,
                    to: {
                        beta: mailerNotificationDto.to.beta,
                        production: mailerNotificationDto.to.production,
                        development: mailerNotificationDto.to.beta ?? []
                    },
                    cc: {
                        beta: mailerNotificationDto.cc?.beta ?? [],
                        production: mailerNotificationDto.cc?.production ?? [],
                        development: mailerNotificationDto.cc?.beta ?? []

                    },
                    cco: {
                        beta: mailerNotificationDto.cco?.beta ?? [],
                        production: mailerNotificationDto.cco?.production ?? [],
                        development: mailerNotificationDto.cco?.beta ?? []
                    }
                }  
            })

            if (!created) {
                mailerNotification.subject = mailerNotificationDto.subject;
                mailerNotification.to = {
                    beta: mailerNotificationDto.to.beta,
                    production: mailerNotificationDto.to.production,
                    development: mailerNotificationDto.to.beta ?? []
                };
                mailerNotification.cc = {
                    beta: mailerNotificationDto.cc?.beta ?? [],
                    production: mailerNotificationDto.cc?.production ?? [],
                    development: mailerNotificationDto.cc?.beta ?? []
                };
                mailerNotification.cco = {
                    beta: mailerNotificationDto.cco?.beta ?? [],
                    production: mailerNotificationDto.cco?.production ?? [],
                    development: mailerNotificationDto.cco?.beta ?? []
                };
                await mailerNotification.save();
            }

            return MailerNotificationEntity.fromRow(mailerNotification);
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }

    async getByAbbreviation(abbreviation: string): Promise<MailerNotificationEntity> {
        try {
            const typeNotification = await MailerNotificationSequelize.findOne({
                where: {abbreviation: abbreviation}
            });

            if (!typeNotification) {
                throw CustomError.notFound(`Tipo de notificación con abreviación '${abbreviation}' no encontrado.`);
            }
            return MailerNotificationEntity.fromRow(typeNotification);
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }
}