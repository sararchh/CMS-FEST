import { Router } from "express";

import { registerSchema, registerID, registerUpdateSchema } from "@/schemas";

import { checkjwt, validationSchemaMiddleware } from "@/middlewares";

import {
  registrationCreate,
  registrationDeleteOne,
  registrationGetAll,
  registrationGetById,
  registrationUpdate,
} from "@/controllers/registrations.controller";

const register = Router();

register
  .get("/registrations", registrationGetAll)
  .get(
    "/registrations/:id",
    [checkjwt, validationSchemaMiddleware(registerID)],
    registrationGetById
  )
  .post(
    "/registrations",
    [validationSchemaMiddleware(registerSchema), checkjwt],
    registrationCreate
  )
  .put(
    "/registrations/:id",
    [validationSchemaMiddleware(registerUpdateSchema), checkjwt],
    registrationUpdate
  )
  .delete(
    "/registrations/:id",
    [validationSchemaMiddleware(registerID), checkjwt],
    registrationDeleteOne
  );

export default register;
