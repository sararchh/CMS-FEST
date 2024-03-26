import * as z from "zod";

export const dataOwnerSchema = z.object({
  body: z.object({
    slug: z.string(),
    name: z.string(),
    fullname: z.string(),
    responsible: z.string(),
    email: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    address01: z.string(),
    number: z.number(),
    address02: z.string().optional(),
    state: z.string(),
    city: z.string(),
    cep: z.string(),
    logo: z.string().optional(),
    favicon: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    youtube: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
  }),
});

export const dataOwnerUpdateSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      slug: z.string(),
      name: z.string(),
      fullname: z.string(),
      responsible: z.string(),
      email: z.string(),
      phone: z.string(),
      whatsapp: z.string(),
      address01: z.string(),
      number: z.number(),
      address02: z.string(),
      state: z.string(),
      city: z.string(),
      cep: z.string(),
      logo: z.string(),
      favicon: z.string(),
      title: z.string(),
      description: z.string(),
      youtube: z.string(),
      instagram: z.string(),
      facebook: z.string()
    })
    .partial(),
});

export const dataOwnerSlug = z.object({
  params: z.object({
    slug: z.string(),
  }),
});


