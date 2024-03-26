import * as z from "zod";

export const mvCarouselSchema = z.object({
  params: z.object({
    uuid: z.string().optional()
  }).optional(),
  body: z.object({
    id_position: z.string(),
    url: z.array(z.string()).optional(),
  }),
});

export const mvCarouselUpdateSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      id_position: z.string(),
      status: z.number(),
    })
    .partial(),
});

export const mvCarouselUUID = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});

export const mvCarouselURL = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      url: z.string()
    })
});


