import * as z from "zod";

export const registerSchema = z.object({
  body: z.object({
    link: z.string(),
    title: z.string(),
  }),
});


export const registerUpdateSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({ 
      link: z.string(),
      title: z.string(),
    })
    .partial(),
});

export const registerID = z.object({
  params: z.object({
    id: z.string(),
  }),
});


