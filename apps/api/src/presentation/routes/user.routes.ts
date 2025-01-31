import { Router } from "express";

import * as UserController from "../controllers/user.controller";
import { validate } from "../middlewares/zod.middleware";
import {
  getUserByIdSchema,
  getUserByEmailSchema,
  patchUserschema,
  postUserSchema,
} from "../validators/schemas/user";

const userRoutes = Router();

userRoutes.get(
  "/users/:id",
  validate(getUserByIdSchema),
  UserController.handleGetUserById
);

userRoutes.get(
  "/users/email/:email",
  validate(getUserByEmailSchema),
  UserController.handleGetUserByEmail
);

userRoutes.post(
  "/users",
  validate(postUserSchema),
  UserController.handlePostUser
);

userRoutes.patch(
  "/users/:id",
  validate(patchUserschema),
  UserController.handlePatchUser
);

export default userRoutes;
