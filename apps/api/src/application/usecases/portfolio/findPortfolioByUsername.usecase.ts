import { Portfolio } from "../../../domain/portfolio";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { PortfolioRepository } from "../../interfaces/portfolio.repository";

export const findPortfolioByUsername =
  (portfolioRepository: PortfolioRepository) =>
  async (name: string): Promise<Either<RepositoryErrors, Portfolio | null>> => {
    const portfolioOrError = await portfolioRepository.findByUsername(name);

    if (portfolioOrError.isFailure()) return failure(portfolioOrError.value);

    const portfolio = portfolioOrError.value;
    return success(portfolio);
  };
