import { User } from "../../domain/user";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type UserRepository = {
  findById(id: number): Promise<Either<RepositoryErrors, User | null>>;
  findByEmail(email: string): Promise<Either<RepositoryErrors, User | null>>;
  create(
    body: Pick<User, "name" | "email">
  ): Promise<Either<RepositoryErrors, User>>;
  update(
    id: number,
    body: Partial<Pick<User, "name" | "email">>
  ): Promise<Either<RepositoryErrors, User>>;
};
