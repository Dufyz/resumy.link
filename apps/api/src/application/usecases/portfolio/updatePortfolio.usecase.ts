import { Portfolio } from "../../../domain/portfolio";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { PortfolioRepository } from "../../interfaces/portfolio.repository";

export const updatePortfolio =
  (portfolioRepository: PortfolioRepository) =>
  async (
    id: number,
    body: Partial<Pick<Portfolio, "name">>
  ): Promise<Either<RepositoryErrors, Portfolio>> => {
    const portfolioOrError = await portfolioRepository.update(id, {
      name: body.name,
    });

    if (portfolioOrError.isFailure()) return failure(portfolioOrError.value);

    const portfolio = portfolioOrError.value;
    return success(portfolio);
  };
