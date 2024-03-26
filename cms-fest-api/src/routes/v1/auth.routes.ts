import { Router } from "express";

import { userSchema, userLoginSchema } from "@/schemas";
import { validationSchemaMiddleware } from "@/middlewares";
import {
  signInAuth,
  signUpAuth,
  refreshTokenAuth,
} from "@/controllers/auth.controller";

const authRoutes = Router();

authRoutes
  .post("/sign-in", validationSchemaMiddleware(userLoginSchema),signInAuth)
  .post("/sign-up", validationSchemaMiddleware(userSchema), signUpAuth)
  .post("/refresh-token", refreshTokenAuth);

export default authRoutes;
