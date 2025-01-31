import { User } from "../../../domain/user";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { UserRepository } from "../../interfaces/user.repository";

export const createUser =
  (userRepository: UserRepository) =>
  async (
    body: Pick<User, "name" | "email">
  ): Promise<Either<RepositoryErrors, User>> => {
    const userOrError = await userRepository.create({
      name: body.name,
      email: body.email,
    });

    if (userOrError.isFailure()) return failure(userOrError.value);

    const user = userOrError.value;
    return success(user);
  };
