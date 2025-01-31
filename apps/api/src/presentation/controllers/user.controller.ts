import z from "zod";
import {
  createUser,
  findUserById,
  updateUser,
  findUserByEmail,
} from "../../application/usecases/user";
import { userRepository } from "../../infra/database/repositories/user.repository";
import { Request, Response } from "express";
import {
  getUserByIdSchema,
  getUserByEmailSchema,
  patchUserschema,
  postUserSchema,
} from "../validators/schemas/user";

export async function handleGetUserById(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof getUserByIdSchema
  >["params"];

  const userOrError = await findUserById(userRepository)(id);

  if (userOrError.isFailure()) {
    res.status(404).json({ message: userOrError.value.message });
    return;
  }

  const user = userOrError.value;

  if (user === null) {
    res.status(404).json({ user, message: "User not found" });
    return;
  }

  res.status(200).json({
    user,
    message: "User found",
  });
}

export async function handleGetUserByEmail(req: Request, res: Response) {
  const { email } = req.params as unknown as z.infer<
    typeof getUserByEmailSchema
  >["params"];

  const userOrError = await findUserByEmail(userRepository)(email);

  if (userOrError.isFailure()) {
    res.status(404).json({ message: userOrError.value.message });
    return;
  }

  const user = userOrError.value;

  if (user === null) {
    res.status(404).json({ user, message: "User not found" });
    return;
  }

  res.status(200).json({
    user,
    message: "User found",
  });
}

export async function handlePostUser(req: Request, res: Response) {
  const { name, email } = req.body as unknown as z.infer<
    typeof postUserSchema
  >["body"];

  const userOrError = await createUser(userRepository)({
    name,
    email,
  });

  if (userOrError.isFailure()) {
    res.status(400).json({ message: userOrError.value.message });
    return;
  }

  const user = userOrError.value;
  res.status(201).json({
    user,
    message: "User created",
  });
}

export async function handlePatchUser(req: Request, res: Response) {
  const { id } = req.params as unknown as z.infer<
    typeof patchUserschema
  >["params"];
  const { name, email } = req.body as unknown as z.infer<
    typeof patchUserschema
  >["body"];

  const userOrError = await updateUser(userRepository)(id, {
    name,
    email,
  });

  if (userOrError.isFailure()) {
    res.status(404).json({ message: userOrError.value.message });
    return;
  }

  const user = userOrError.value;
  res.status(200).json({
    user,
    message: "User updated",
  });
}
