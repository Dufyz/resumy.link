import { Portfolio } from "../../domain/portfolio";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type PortfolioRepository = {
  findById(id: number): Promise<Either<RepositoryErrors, Portfolio | null>>;
  findByName(name: string): Promise<Either<RepositoryErrors, Portfolio | null>>;
  create(
    body: Pick<Portfolio, "name" | "user_id">
  ): Promise<Either<RepositoryErrors, Portfolio>>;
  update(
    id: number,
    body: Partial<Pick<Portfolio, "name">>
  ): Promise<Either<RepositoryErrors, Portfolio>>;
};
