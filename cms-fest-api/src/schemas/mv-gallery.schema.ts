import * as z from "zod";

export const mvGallerySchema = z.object({
  body: z.object({
    url: z.string(),
  }),
});


export const mvGalleryUUID = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});


