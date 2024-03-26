import { Router } from "express";

import {
  mvScheduleSchema,
  mvScheduleUUID,
  mvScheduleUpdateSchema,
} from "@/schemas";

import { checkjwt, validationSchemaMiddleware } from "@/middlewares";

import {
  mvScheduleCreate,
  mvScheduleGetByUUID,
  mvScheduleGetAll,
  mvScheduleUpdate,
  mvScheduleDeleteOne,
} from "@/controllers/mv-schedule.controller";

const mvSchedules = Router();

mvSchedules
  .get("/schedule", mvScheduleGetAll)
  .get(
    "/schedule/:uuid",
    [checkjwt, validationSchemaMiddleware(mvScheduleUUID)],
    mvScheduleGetByUUID
  )
  .post(
    "/schedule",
    [validationSchemaMiddleware(mvScheduleSchema), checkjwt],
    mvScheduleCreate
  )
  .put(
    "/schedule/:uuid",
    [validationSchemaMiddleware(mvScheduleUpdateSchema), checkjwt],
    mvScheduleUpdate
  )
  .delete(
    "/schedule/:uuid",
    [validationSchemaMiddleware(mvScheduleUpdateSchema), checkjwt],
    mvScheduleDeleteOne
  )

export default mvSchedules;
