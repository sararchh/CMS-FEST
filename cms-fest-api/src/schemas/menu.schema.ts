import * as z from "zod";

export const menuSchema = z.object({
  body: z.object({
    url: z.string(),
  }),
});

export const menuUpdateSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      url: z.string(),
    })
    .partial(),
});

export const menuUUID = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});

export const menuURL = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      url: z.string()
    })
});

