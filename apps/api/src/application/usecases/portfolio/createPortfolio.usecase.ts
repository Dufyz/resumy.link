import { Portfolio } from "../../../domain/portfolio";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { PortfolioRepository } from "../../interfaces/portfolio.repository";

export const createPortfolio =
  (portfolioRepository: PortfolioRepository) =>
  async (
    body: Pick<Portfolio, "name" | "user_id">
  ): Promise<Either<RepositoryErrors, Portfolio>> => {
    const portfolioOrError = await portfolioRepository.create({
      name: body.name,
      user_id: body.user_id,
    });

    if (portfolioOrError.isFailure()) return failure(portfolioOrError.value);

    const portfolio = portfolioOrError.value;
    return success(portfolio);
  };
