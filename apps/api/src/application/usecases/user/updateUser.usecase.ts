import { User } from "../../../domain/user";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { UserRepository } from "../../interfaces/user.repository";

export const updateUser =
  (userRepository: UserRepository) =>
  async (
    id: number,
    body: Partial<Pick<User, "name" | "email" | "avatar_path">>
  ): Promise<Either<RepositoryErrors, User>> => {
    const userOrError = await userRepository.update(id, {
      name: body.name,
      email: body.email,
      avatar_path: body.avatar_path,
    });

    if (userOrError.isFailure()) return failure(userOrError.value);

    const user = userOrError.value;
    return success(user);
  };
