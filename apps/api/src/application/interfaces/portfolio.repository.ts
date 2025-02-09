import { Portfolio } from "../../domain/portfolio";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type PortfolioRepository = {
  findById(id: number): Promise<Either<RepositoryErrors, Portfolio | null>>;
  findByUsername(
    username: string
  ): Promise<Either<RepositoryErrors, Portfolio | null>>;
  findByUserId(
    user_id: number
  ): Promise<Either<RepositoryErrors, Portfolio | null>>;
  checkUsernameAvailability(
    username: string
  ): Promise<Either<RepositoryErrors, boolean>>;
  countActivePortfoliosByUserId(
    user_id: number
  ): Promise<Either<RepositoryErrors, number>>;
  create(
    body: Pick<
      Portfolio,
      "user_id" | "username" | "title" | "bio" | "avatar_path"
    >
  ): Promise<Either<RepositoryErrors, Portfolio>>;
  update(
    id: number,
    body: Partial<
      Pick<
        Portfolio,
        "username" | "title" | "bio" | "avatar_path" | "is_active" | "metadata"
      >
    >
  ): Promise<Either<RepositoryErrors, Portfolio>>;
};
