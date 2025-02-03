import api from "@/config/api";
import { CreateUserSchema, UpdateUserSchema } from "@/schemas/user-schema";
import { User } from "@/types/user-type";

export async function getUserById(id: number): Promise<{
  user: User;
  message: string;
}> {
  const response = await api.get(`/users/${id}`);

  return response.data;
}

export async function getUserByEmail(email: string): Promise<{
  user: User;
  message: string;
}> {
  const response = await api.get(`/users/email/${email}`);

  return response.data;
}

export async function postUser(body: CreateUserSchema): Promise<{
  user: User;
  message: string;
}> {
  const response = await api.post("/users", body);

  return response.data;
}

export async function patchUser(
  id: number,
  body: UpdateUserSchema
): Promise<{
  user: User;
  message: string;
}> {
  const response = await api.patch(`/users/${id}`, body);

  return response.data;
}
