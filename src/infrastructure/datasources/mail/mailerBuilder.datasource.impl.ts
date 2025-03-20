import { MailerTemplateContentDatasourceImpl } from "./mailerTemplateContent.datasource.impl";
import handlebars from "handlebars";
import { MailerNotificationDatasourceImpl } from "./mailerNotification.datasource.impl";
import { CustomError } from "@/domain/errors/custom.error";
import { MailerHistoryDatasourceImpl } from "./mailerHistory.datasource.impl";
import { MailerNotificationStatus } from "@/infrastructure/database/models/MailerHistory";
import { MailerBuilderNotificationDatasource } from "@/domain/datasources/mail/mailerBuilder.datasource";
import SendMailerDto from "@/domain/dtos/mail/sendMailer.dto";
import { Environment } from "@/shared/types";
import MailerRequestDto from "@/domain/dtos/mail/mailerRequest.dto";
import MailerHistoryDto from "@/domain/dtos/mail/mailerHistory.dto";
import { Mailer } from "@/infrastructure/mail/mailer";
import { MailerNotificationEntity } from "@/domain/entity/mail/mailerNotification.entity";
import InscriptionElementEventDto from "@/domain/dtos/inscription/inscriptionElement.event.dto";
import appConfig from "@/shared/appConfig";


export class MailerBuilderNotificationDatasourceImpl implements MailerBuilderNotificationDatasource {
    private studentInscriptionDto: string | null = null;
    private mailerRequestDto: MailerRequestDto | null = null;
    private mailerNotificationEntity: MailerNotificationEntity | null = null;
    private notificationAbbreviation: string = '';
    private templateAbbreviation: string = '';
    private contentAbbreviation: string = '';

    private async initialize(): Promise<void> {
        this.studentInscriptionDto = this.mailerRequestDto?.studentInscription ?? null;
        this.notificationAbbreviation = this.mailerRequestDto?.notificationAbbreviation ?? '';
        this.templateAbbreviation = this.mailerRequestDto?.templateAbbreviation ?? '';
        this.contentAbbreviation = this.mailerRequestDto?.contentAbbreviation ?? '';
        this.mailerNotificationEntity = await new MailerNotificationDatasourceImpl().getByAbbreviation(this.notificationAbbreviation);
    }

    async buildNotification(): Promise<SendMailerDto> {
        try {
            const placeholders = this.mailerRequestDto?.placeholders ?? {};
            const environment: Environment = appConfig.MAILER_ENVIRONMENT as Environment;
            
            const environmentPrefix = environment !== 'production'
                ? `${environment.charAt(0).toUpperCase() + environment.slice(1)} - `
                : '';

            const getField = (entityField?: string[], requestField?: string[]) => [
                ...(entityField ?? []),
                ...(requestField ?? [])
            ];

            const getTo = (): string[] => this.mailerNotificationEntity?.to?.[environment] ?? [];
            const getCc = (): string[] => this.mailerNotificationEntity?.cc?.[environment] ?? [];
            const getCco = (): string[] => this.mailerNotificationEntity?.cco?.[environment] ?? [];
            const getSubject = (): string => this.mailerNotificationEntity?.subject ?? '';

            const getBody = async (): Promise<string> => {
                return (await new MailerTemplateContentDatasourceImpl().getBlankHtml(
                    this.templateAbbreviation, this.contentAbbreviation, this.notificationAbbreviation
                )) ?? '';
            };

            const notificationDetails = {
                to: getField(getTo(), this.mailerRequestDto?.to),
                subject: environmentPrefix + await this.renderTemplateWithPlaceholders(getSubject(), placeholders),
                body: await this.renderTemplateWithPlaceholders(await getBody(), placeholders),
                cc: getField(getCc(), this.mailerRequestDto?.cc),
                cco: getField(getCco(), this.mailerRequestDto?.cco)
            };
            return notificationDetails;
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }

    async sendNotification(mailerRequest: MailerRequestDto): Promise<void> {
        try {
            this.mailerRequestDto = mailerRequest;
            await this.initialize();
            const emailNotification = await this.buildNotification();

            // Check if emailNotification exists
            const exists = await new MailerHistoryDatasourceImpl().checkIfNotificationExists('asdasd', this.mailerNotificationEntity?.id!);

            if (exists) {
                console.log('Notification already sent');
            } else {
                console.log('Registering notification');
                const [error, mailerNotificationHistoryDto] = MailerHistoryDto.create({
                    studentUuid: 'asdasda',
                    mailerNotificationId: this.mailerNotificationEntity?.id,
                    subject: emailNotification.subject,
                    to: emailNotification.to.join(', '),
                    cc: emailNotification.cc?.join(', '),
                    cco: emailNotification.cco?.join(', '),
                    body: emailNotification.body,
                    status: MailerNotificationStatus.PENDING
                });              
                if (error) {
                    throw CustomError.internalServer('Error creating mailer notification history');
                }

                if (mailerNotificationHistoryDto) {
                    const registeredNotification = await new MailerHistoryDatasourceImpl().register(mailerNotificationHistoryDto);

                    console.log('Sending email');
                    const sendNotification = await new Mailer().sendMail(emailNotification);

                    if (sendNotification) {
                        await new MailerHistoryDatasourceImpl().updateStatus(registeredNotification.uuid, MailerNotificationStatus.SENT);
                        console.log('Email sent');
                    } else {
                        await new MailerHistoryDatasourceImpl().updateStatus(registeredNotification.uuid, MailerNotificationStatus.FAILED);
                        console.log('Failed to send email');
                    }
                }
            }
        }catch (error: any) {
            console.log(error)
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }

    async renderTemplateWithPlaceholders(template: string, placeholders: { [key: string]: any }): Promise<string> {
        try {
            // Register the "or" helper
            handlebars.registerHelper('or', function () {
                for (let i = 0; i < arguments.length - 1; i++) {
                    if (arguments[i]) {
                        return true;
                    }
                }
                return false;
            });

            const compiledTemplate = handlebars.compile(template);
            return compiledTemplate(placeholders);
        }catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer(error);
        }
    }
    
}