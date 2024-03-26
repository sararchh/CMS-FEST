import * as z from "zod";

export const mvContatoSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    subject: z.string(),
    message: z.string(),
    date: z.string(),
  }),
});

export const mvContatoUpdateSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      subject: z.string(),
      message: z.string(),
      date: z.string(),
    })
    .partial(),
});

export const mvContatoUUID = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});


