import { Router } from "express";

import { userUpdateSchema } from "@/schemas";
import { checkjwt, validationSchemaMiddleware } from "@/middlewares";
import {
  findAll,
  findOne,
  update,
  deleteOne
} from "@/controllers/user.controller";

const userRoutes = Router();

userRoutes
.get('/users', checkjwt, findAll)
.get('/users/:id', checkjwt, findOne)
.delete('/users/:id', checkjwt, deleteOne)
.put('/users/:id', [validationSchemaMiddleware(userUpdateSchema), checkjwt], update)

export default userRoutes;
