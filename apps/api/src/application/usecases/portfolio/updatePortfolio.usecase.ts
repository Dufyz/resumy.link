import { Portfolio } from "../../../domain/portfolio";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { PortfolioRepository } from "../../interfaces/portfolio.repository";

export const updatePortfolio =
  (portfolioRepository: PortfolioRepository) =>
  async (
    id: number,
    body: Partial<
      Pick<Portfolio, "username" | "title" | "bio" | "avatar_path" | "metadata">
    >
  ): Promise<Either<RepositoryErrors, Portfolio>> => {
    const portfolioOrError = await portfolioRepository.update(id, {
      username: body.username,
      title: body.title,
      bio: body.bio,
      avatar_path: body.avatar_path,
      metadata: body.metadata,
    });

    if (portfolioOrError.isFailure()) return failure(portfolioOrError.value);

    const portfolio = portfolioOrError.value;
    return success(portfolio);
  };
