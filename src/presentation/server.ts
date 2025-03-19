import { DbSequelize } from "@/infrastructure/database/init"
import AppConfig from "@/shared/appConfig"
import { Hono } from "hono"
import { cors } from "hono/cors";
import { RabbitMQResilienceRoutes, RabbitMQResilienceSocketManager } from "rabbitmq-resilience";
import { serve } from "@hono/node-server";
import { RabbitMQR } from "@/infrastructure/rabbitmq";
import AppRoutes from "./routes";
<<<<<<< HEAD
import CronProcessorDatasourceImpl from "@/infrastructure/datasources/cronProcessor.datasource.impl";
import AcademicRecordEntity from "@/domain/entity/academicRecord.entity";
import { MailerManagmentDatasourceImpl } from "@/infrastructure/datasources/mail/mailerManagement.datasource.impl";
=======
import { syncInscriptions } from "@/infrastructure/cron";
>>>>>>> 7b1ba18351c7902c60d99629732617a09df4e494

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
<<<<<<< HEAD
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
    
                // ======= Enviar correo desde el datasource ======= //     
                try {
                    const mailerDatasource = new MailerManagmentDatasourceImpl();
                
                    console.log("Llamando a notificationCNF()..."); // Agregar log antes de llamar
                    await mailerDatasource.notificationCNF();
                    console.log("Correo enviado correctamente desde el datasource.");
                } catch (emailError) {
                    console.error("Error enviando correo desde el datasource:", emailError);
                }
                
=======

                    this.app.route('/api', new AppRoutes().routes)
                    const  server = serve({
                        fetch: this.app.fetch,
                        port: this.port
                    }, (info) => {
                        console.log(`Server running on port ${info.port}`)
                    })
                    //initialize socket manager
                    RabbitMQResilienceSocketManager.initialize(server, '/websocket/')
                    await RabbitMQR.init()
                    syncInscriptions.start()
>>>>>>> 7b1ba18351c7902c60d99629732617a09df4e494
            }).catch(error => {
                console.log(error);
            });
        } catch (e) {
            console.log(e);
        }
    }
    
}