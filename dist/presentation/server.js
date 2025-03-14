"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const init_1 = require("../infrastructure/database/init");
const appConfig_1 = __importDefault(require("../shared/appConfig"));
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const rabbitmq_resilience_1 = require("rabbitmq-resilience");
const node_server_1 = require("@hono/node-server");
const rabbitmq_1 = require("../infrastructure/rabbitmq");
const custom_error_1 = require("../domain/errors/custom.error");
class Server {
    constructor(options) {
        const { port = appConfig_1.default.PORT } = options;
        this.app = new hono_1.Hono();
        this.port = port;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, init_1.DbSequelize)().then(() => __awaiter(this, void 0, void 0, function* () {
                    rabbitmq_1.RabbitMQR.init().then(() => {
                        //TODO: Uncomment this line to run the migration
                        //await new AcademicElementMigration().migrate()
                        this.app.use('*', (c, next) => __awaiter(this, void 0, void 0, function* () {
                            const corsMiddleware = (0, cors_1.cors)();
                            return yield corsMiddleware(c, next);
                        }));
                        this.app.get("/", (c) => {
                            return c.json({
                                status: "success",
                                message: "Welcome to sync student service"
                            });
                        });
                        this.app.route('/', new rabbitmq_resilience_1.RabbitMQResilienceRoutes().routes);
                        const server = (0, node_server_1.serve)({
                            fetch: this.app.fetch,
                            port: this.port
                        }, (info) => {
                            console.log(`Server running on port ${info.port}`);
                        });
                        //initialize socket manager
                        rabbitmq_resilience_1.RabbitMQResilienceSocketManager.initialize(server, '/websocket/');
                    }).catch(error => {
                        throw custom_error_1.CustomError.internalServer(error);
                    });
                })).catch(error => {
                    console.log(error);
                });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.Server = Server;
