import * as z from "zod";

export const typeSponsorsSchema = z.object({
  body: z.object({
    name: z.string(),
    order: z.number(),
  }),
});

export const typeSponsorsUpdateSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      name: z.string(),
      order: z.number(),
    })
    .partial(),
});

export const typeSponsorsUUID = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});


