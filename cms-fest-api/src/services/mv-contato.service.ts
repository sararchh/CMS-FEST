import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  mailsendErrorRequest,
  registerNotExistsError,
} from "@/errors";

import { Nodemailer } from "@/lib/nodemailer.lib";

import mvContatoRepositories from "@/repositories/mv-contato.repository";

import { IMvContato } from "ts";

export async function findAll(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string
): Promise<any> {
  const mvContato = await mvContatoRepositories.findAll(
    parbusca,
    page,
    limit,
    order,
    orderType
  );
  return mvContato;
}

export async function findByUUID(uuid: string): Promise<IMvContato | {}> {
  const mvContato: IMvContato = await mvContatoRepositories.findByUUID(uuid);
  return mvContato;
}

export async function create(dataValues: IMvContato): Promise<IMvContato | {}> {
  try {
    const sendEmail = await sendContactFormEmail(dataValues);

    if (!sendEmail) throw mailsendErrorRequest();

    const mvContato: IMvContato = await mvContatoRepositories.create(
      dataValues
    );
    return mvContato;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

async function sendContactFormEmail({
  name,
  email,
  phone,
  subject,
  message,
  date,
}: IMvContato) {
  try {
    const nodemailer = new Nodemailer();
    const host = process.env?.APP_URL
      ? `${process.env.APP_URL}`
      : "https://seusite.com";

    const htmlToSend = `
          <div style="padding: 20px; font-family: Arial, sans-serif;">

          <div style="text-align: center; margin-bottom: 20px; font-family: Arial, sans-serif;">
          <img src="https://seusite.com/images/logo-bigger.png" alt="CMS FEST Logo" style="vertical-align: middle; margin-right: 10px; height: 60px;">
          <span style="vertical-align: middle; font-family: Arial, sans-serif;">
            <h1 style="color: #333333; text-align: left">Novo Contato</h1>
          </span>
        </div>

              <div style="background-color: #f4f4f4; padding: 15px; border-radius: 10px;">
                  <p><b>Nome:</b> ${name}</p>
                  <p><b>Email:</b> ${email}</p>
                  <p><b>Telefone:</b> ${phone}</p>
                  <p><b>Assunto:</b> ${subject}</p>
                  <p><b>Mensagem:</b> ${message}</p>
                  <p><b>Data:</b> ${new Date(date)
                    .toLocaleString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                    .replace(/\//g, "-")
                    .replace(",", "")}</p>
              </div>
              <p style="text-align: center; margin-top: 20px; font-size: 12px;">
                  &copy; ${new Date().getFullYear()} Seu Site. Todos os direitos reservados.
              </p>
          </div>
      `;

    await nodemailer.sendMail(
      "contato@festcms.com",
      "Novo Contato do Site",
      null,
      htmlToSend
    );

    return true;
  } catch (error) {
    throw mailsendErrorRequest();
  }
}

export async function update(
  uuid: string,
  dataValues: IMvContato
): Promise<IMvContato | {}> {
  try {
    const mvContatoExists = await mvContatoRepositories.findByUUID(uuid);

    if (!mvContatoExists) {
      throw registerNotExistsError();
    }

    const mvContato: IMvContato = await mvContatoRepositories.update(
      mvContatoExists._id,
      dataValues
    );
    return mvContato;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

export async function deleteOne(uuid: string): Promise<IMvContato | {}> {
  try {
    const mvContatoExists = await mvContatoRepositories.findByUUID(uuid);

    if (!mvContatoExists) {
      throw registerNotExistsError();
    }

    const mvContato = await mvContatoRepositories.deleteOne(
      mvContatoExists._id
    );
    return mvContato;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const mvContatoervice = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default mvContatoervice;
