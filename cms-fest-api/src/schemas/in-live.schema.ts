import * as z from "zod";

export const inLiveSchema = z.object({
  body: z.object({
    date: z.string().transform((str) => new Date(str)),
    url_live: z.string(),
    title: z.string(),
  }),
});


export const inLiveUpdateSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({ 
      date: z.string().transform((str) => new Date(str)),
      url_live: z.string(),
      title: z.string(),
      status: z.number(),
    })
    .partial(),
});

export const inLiveUUID = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});


