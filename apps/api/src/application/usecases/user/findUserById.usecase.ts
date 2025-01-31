import { User } from "../../../domain/user";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { UserRepository } from "../../interfaces/user.repository";

export const findUserById =
  (userRepository: UserRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, User | null>> => {
    const userOrError = await userRepository.findById(id);

    if (userOrError.isFailure()) return failure(userOrError.value);

    const user = userOrError.value;
    return success(user);
  };
