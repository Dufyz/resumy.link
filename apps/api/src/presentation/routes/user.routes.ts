import { Router } from "express";

import * as UserController from "../controllers/user.controller";
import { validate } from "../middlewares/zod.middleware";
import { getUserByIdSchema } from "../validators/schemas/user/getUserById.schema";
import { postUserSchema } from "../validators/schemas/user/postUser.schema";
import { patchUserschema } from "../validators/schemas/user/patchUser.schema";

const userRoutes = Router();

userRoutes.get(
  "/users/:id",
  validate(getUserByIdSchema),
  UserController.handleGetUserById
);

userRoutes.get("/users/email/:email", UserController.handleGetUserByEmail);

userRoutes.get(
  "users/username/:username",
  UserController.handleGetUserByUsername
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
