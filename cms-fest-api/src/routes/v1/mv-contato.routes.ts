import { Router } from "express";

import {
  mvContatoSchema,
  mvContatoUUID,
  mvContatoUpdateSchema,
} from "@/schemas";

import { checkjwt, validationSchemaMiddleware } from "@/middlewares";

import {
  mvContatoCreate,
  mvContatoGetByUUID,
  mvContatoGetAll,
  mvContatoUpdate,
  mvContatoDeleteOne,
} from "@/controllers/mv-contato.controller";

const mvContatos = Router();

mvContatos
  .get("/contato", [checkjwt], mvContatoGetAll)
  .get(
    "/contato/:uuid",
    [checkjwt, validationSchemaMiddleware(mvContatoUUID)],
    mvContatoGetByUUID
  )
  .post(
    "/contato",
    [validationSchemaMiddleware(mvContatoSchema)],
    mvContatoCreate
  )
  .put(
    "/contato/:uuid",
    [validationSchemaMiddleware(mvContatoUpdateSchema), checkjwt],
    mvContatoUpdate
  )
  .delete(
    "/contato/:uuid",
    [validationSchemaMiddleware(mvContatoUpdateSchema), checkjwt],
    mvContatoDeleteOne
  );

export default mvContatos;
