import * as z from "zod";

export const sponsorsSchema = z.object({
  body: z.object({
    name: z.string(),
    id_type: z.string().optional(),
    thumb: z.string().optional(),
    status: z.number().optional()
  }),
});

export const sponsorsUpdateSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      name: z.string(),
      id_type: z.string().optional(),
      thumb: z.string().optional(),
      status: z.number(),
    })
    .partial(),
});

export const sponsorsUUID = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});


