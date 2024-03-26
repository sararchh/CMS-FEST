import { Router } from "express";

import { inLiveSchema, inLiveUUID, inLiveUpdateSchema } from "@/schemas";

import { checkjwt, validationSchemaMiddleware } from "@/middlewares";

import {
  inLiveCreate,
  inLiveGetByUUID,
  inLiveGetAll,
  inLiveUpdate,
  inLiveDeleteOne,
} from "@/controllers/in-live.controller";

const inLive = Router();

inLive
  .get("/in-live",  inLiveGetAll)
  .get(
    "/in-live/:uuid",
    [checkjwt, validationSchemaMiddleware(inLiveUUID)],
    inLiveGetByUUID
  )
  .post(
    "/in-live",
    [validationSchemaMiddleware(inLiveSchema), checkjwt],
    inLiveCreate
  )
  .put(
    "/in-live/:uuid",
    [validationSchemaMiddleware(inLiveUpdateSchema), checkjwt],
    inLiveUpdate
  )
  .delete(
    "/in-live/:uuid",
    [validationSchemaMiddleware(inLiveUpdateSchema), checkjwt],
    inLiveDeleteOne
  );

export default inLive;
