import { User } from "../../../domain/user";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { UserRepository } from "../../interfaces/user.repository";

export const findUserByEmail =
  (userRepository: UserRepository) =>
  async (email: string): Promise<Either<RepositoryErrors, User | null>> => {
    const userOrError = await userRepository.findByEmail(email);

    if (userOrError.isFailure()) return failure(userOrError.value);

    const user = userOrError.value;
    return success(user);
  };
