import { Either, failure, success } from "../../../../shared/utils/either";
import { RepositoryErrors } from "../../../errors";
import { PortfolioSectionRepository } from "../../../interfaces/portfolio_section.repository";

export const deletePortfolioSection =
  (portfolioSectionRepository: PortfolioSectionRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, void>> => {
    const portfolioSectionOrError = await portfolioSectionRepository.delete(id);

    if (portfolioSectionOrError.isFailure())
      return failure(portfolioSectionOrError.value);

    return success(undefined);
  };
