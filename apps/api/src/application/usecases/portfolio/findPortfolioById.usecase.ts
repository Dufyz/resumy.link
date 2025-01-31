import { Portfolio } from "../../../domain/portfolio";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { PortfolioRepository } from "../../interfaces/portfolio.repository";

export const findPortfolioById =
  (portfolioRepository: PortfolioRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, Portfolio | null>> => {
    const portfolioOrError = await portfolioRepository.findById(id);

    if (portfolioOrError.isFailure()) return failure(portfolioOrError.value);

    const portfolio = portfolioOrError.value;
    return success(portfolio);
  };
