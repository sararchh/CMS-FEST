import { z } from "zod";

export const envSchema = z.object({
  ENV: z.enum(["development", "tests", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),

  API_DATABASE_USER: z.coerce.string(),
  API_DATABASE_PASSWORD: z.coerce.string(),
  API_DATABASE_HOST: z.coerce.string(),
  API_DATABASE_NAME: z.coerce.string(),

  JWT_SECRET: z.coerce.string(),
  JWT_REFRESH_SECRET: z.coerce.string(),
  JWT_EXPIRES: z.coerce.string().default("7d"),

  BCRYPT_SALTS: z.coerce.number(),

  S3_REGION: z.coerce.string(),
  S3_ACCESS_KEY: z.coerce.string(),
  S3_SECRET_KEY: z.coerce.string(),
  S3_NAME_BUCKET: z.coerce.string(),

  MAIL_HOST: z.coerce.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_USER: z.coerce.string(),
  MAIL_PASS: z.coerce.string(),
  APP_URL: z.coerce.string(),
});
