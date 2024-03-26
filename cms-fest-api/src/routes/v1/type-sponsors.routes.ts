import { Router } from "express";

import {
  typeSponsorsSchema,
  typeSponsorsUUID,
  typeSponsorsUpdateSchema,
} from "@/schemas";

import { checkjwt, validationSchemaMiddleware } from "@/middlewares";

import {
  typeSponsorsCreate,
  typeSponsorsGetByUUID,
  typeSponsorsGetAll,
  typeSponsorsUpdate,
  typeSponsorsDeleteOne,
} from "@/controllers/type-sponsors.controller";

const typeSponsors = Router();

typeSponsors
  .get("/type-sponsors", typeSponsorsGetAll)
  .get(
    "/type-sponsors/:uuid",
    [checkjwt, validationSchemaMiddleware(typeSponsorsUUID)],
    typeSponsorsGetByUUID
  )
  .post(
    "/type-sponsors",
    [validationSchemaMiddleware(typeSponsorsSchema), checkjwt],
    typeSponsorsCreate
  )
  .put(
    "/type-sponsors/:uuid",
    [validationSchemaMiddleware(typeSponsorsUpdateSchema), checkjwt],
    typeSponsorsUpdate
  )
  .delete(
    "/type-sponsors/:uuid",
    [validationSchemaMiddleware(typeSponsorsUpdateSchema), checkjwt],
    typeSponsorsDeleteOne
  )

export default typeSponsors;
