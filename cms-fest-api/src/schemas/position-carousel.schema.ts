import * as z from "zod";

export const PositionCarouselSchema = z.object({
  body: z.object({
    position: z.string().trim(),
  }),
});

export const PositionCarouselUpdateSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
  body: z
    .object({
      position: z.string().trim(),
    })
    .partial(),
});

export const PositionCarouselUUID = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});


