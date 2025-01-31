import { User } from "../../../domain/user";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { UserRepository } from "../../interfaces/user.repository";

export const findUserByUsername =
  (userRepository: UserRepository) =>
  async (username: string): Promise<Either<RepositoryErrors, User | null>> => {
    const userOrError = await userRepository.findByUsername(username);

    if (userOrError.isFailure()) return failure(userOrError.value);

    const user = userOrError.value;
    return success(user);
  };
