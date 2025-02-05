/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/api";
import { ApiError } from "@/errors/api-error";
import { Either, failure, success } from "@/lib/either";
import { CreateUserSchema, UpdateUserSchema } from "@/schemas/user-schema";
import { User } from "@/types/user-type";

export async function getUserById(id: number): Promise<
  Either<
    ApiError,
    {
      user: User;
      message: string;
    }
  >
> {
  try {
    const response = await api.get(`/users/${id}`);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function getUserByEmail(email: string): Promise<
  Either<
    ApiError,
    {
      user: User;
      message: string;
    }
  >
> {
  try {
    const response = await api.get(`/users/email/${email}`);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function postUser(body: CreateUserSchema): Promise<
  Either<
    ApiError,
    {
      user: User;
      message: string;
    }
  >
> {
  try {
    const response = await api.post("/users", body);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function patchUser(
  id: number,
  body: UpdateUserSchema
): Promise<
  Either<
    ApiError,
    {
      user: User;
      message: string;
    }
  >
> {
  try {
    const response = await api.patch(`/users/${id}`, body);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}
