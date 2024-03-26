import * as z from "zod";

export const userSchema = z.object({
  query: z.object({
    parbusca: z.string(),
    page: z.string(),
    limit: z.string(),
    order: z.string(),
    orderType: z.string(),
    isAdmin: z.string(),
  }).partial().optional(),
  body: z.object({
    name: z.string(),
    email: z.string().trim(),
    phone: z.string(),
    password: z.string(),
    status: z.number().optional(),
    isAdmin: z.boolean().optional().default(false),
  }),
});

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().trim(),
    password: z.string(),
  }),
});

export const userUpdateSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      name: z.string(),
      email: z.string().trim().email("Dever ser e-mail valido"),
      phone: z.string(),
      password: z.string(),
      status: z.number(),
      isAdmin: z.boolean().optional().default(false),
    })
    .partial(),
});
