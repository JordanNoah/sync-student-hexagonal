import appConfig from "@/shared/appConfig";
import nodemailer from "nodemailer";

export const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: appConfig.EMAIL_HOST,
    port: appConfig.EMAIL_PORT,
    auth: {
        user: appConfig.EMAIL_USER,
        pass: appConfig.EMAIL_PASS
    }
} as nodemailer.TransportOptions)