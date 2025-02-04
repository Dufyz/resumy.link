import { Portfolio } from "../../../domain/portfolio";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { PortfolioRepository } from "../../interfaces/portfolio.repository";

export const findPortfolioByUserId =
  (portfolioRepository: PortfolioRepository) =>
  async (
    userId: number
  ): Promise<Either<RepositoryErrors, Portfolio | null>> => {
    const portfolioOrError = await portfolioRepository.findByUserId(userId);

    if (portfolioOrError.isFailure()) return failure(portfolioOrError.value);

    const portfolio = portfolioOrError.value;
    return success(portfolio);
  };
