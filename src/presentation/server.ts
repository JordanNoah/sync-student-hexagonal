import { DbSequelize } from "@/infrastructure/database/init"
import AppConfig from "@/shared/appConfig"
import { Hono } from "hono"
import { cors } from "hono/cors";
import { RabbitMQResilienceRoutes, RabbitMQResilienceSocketManager } from "rabbitmq-resilience";
import { serve } from "@hono/node-server";
import { RabbitMQR } from "@/infrastructure/rabbitmq";
import AppRoutes from "./routes";
import CronProcessorDatasourceImpl from "@/infrastructure/datasources/cronProcessor.datasource.impl";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import { MailerManagmentDatasourceImpl } from "@/infrastructure/datasources/mail/mailerManagement.datasource.impl";

interface Options {
    port?: number
}

export class Server {
    public readonly app: Hono
    private readonly port: number

    constructor(options: Options) {
        const { port = AppConfig.PORT } = options
        this.app = new Hono()
        this.port = port
    }

    public async start() {
        try {
            DbSequelize().then(async () => {
                
                this.app.use('*', async (c, next) => {
                    const corsMiddleware = cors();
                    return await corsMiddleware(c, next);
                });
    
                this.app.get("/", (c) => {
                    return c.json({
                        status: "success",
                        message: "Welcome to sync student service"
                    });
                });
    
                this.app.route('/api', new AppRoutes().routes);
    
                const server = serve({
                    fetch: this.app.fetch,
                    port: this.port
                }, (info) => {
                    console.log(`Server running on port ${info.port}`);
                });
    
                // Initialize socket manager
                RabbitMQResilienceSocketManager.initialize(server, '/websocket/');
                await RabbitMQR.init();
                await new CronProcessorDatasourceImpl().processInscriptions();
    
                
                
            }).catch(error => {
                console.log(error);
            });
        } catch (e) {
            console.log(e);
        }
    }
    
}