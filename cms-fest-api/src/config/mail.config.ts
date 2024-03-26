import { MailConfig } from "@/ts/interfaces/nodemailer.interface";

export const mailConfig: MailConfig = {
    host: `${process.env.MAIL_HOST}`,
    port: `${process.env.MAIL_PORT}`,
    secure: false,
    auth: {
        user: `${process.env.MAIL_USER}`,
        pass: `${process.env.MAIL_PASS}`
    },
    default: {
        from: 'FESTCMS <contato@festcms.com>',
    },
};