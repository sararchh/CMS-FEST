import nodemailer, { Transporter } from "nodemailer";

import { mailsendErrorRequest } from "@/errors/invalidDataError";

import { MailConfig } from "@/ts/interfaces/nodemailer.interface";
import { mailConfig } from "@/config/mail.config";

export class Nodemailer {
  transporter: Transporter;
  mailConfig: MailConfig;

  constructor() {
    this.mailConfig = mailConfig;
    this.transporter = nodemailer.createTransport({
      host: this.mailConfig?.host,
      port: this.mailConfig?.port,
      secure: this.mailConfig?.secure,
      auth: {
        user: this.mailConfig?.auth.user,
        pass: this.mailConfig?.auth.pass,
      },
    });
  }

  async sendMail(to, subject, text, html) {
    const mailOptions = {
      from: this.mailConfig?.default?.from, // Sender address
      to, // List of receivers
      subject, // Subject line
      text, // Plain text body
      html, // HTML body
    };

    try {
      let info = await this.transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      return info;
    } catch (error) {
      console.error("Error occurred:", error);
      throw mailsendErrorRequest();
    }
  }
}