import * as z from "zod";

export const newsSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

export const newsUpdateSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      thumb: z.string(),
      status: z.number(),
    })
    .partial(),
});

export const newsSlug = z.object({
  params: z.object({
    slug: z.string()
  }),
});


