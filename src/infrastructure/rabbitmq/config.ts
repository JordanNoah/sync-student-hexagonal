import { Options } from "amqplib"
import appConfig from "@/shared/appConfig";

export const config: Options.Connect = {
    username: appConfig.RABBIT_USERNAME,
    password: appConfig.RABBIT_PASSWORD,
    protocol: appConfig.RABBIT_PROTOCOL,
    hostname: appConfig.RABBIT_HOSTNAME,
    port: Number(appConfig.RABBIT_PORT),
    vhost: appConfig.RABBIT_VHOST
}
