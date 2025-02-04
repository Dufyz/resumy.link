import { PortfolioSection } from "../../../../domain/portfolio/portfolio_section";
import { Either, failure, success } from "../../../../shared/utils/either";
import { RepositoryErrors } from "../../../errors";
import { PortfolioSectionRepository } from "../../../interfaces/portfolio_section.repository";

export const listPortfolioSectionsByPortfolioId =
  (portfolioSectionRepository: PortfolioSectionRepository) =>
  async (
    portfolioId: number
  ): Promise<Either<RepositoryErrors, PortfolioSection[]>> => {
    const portfolioSectionsOrError =
      await portfolioSectionRepository.listByPortfolioId(portfolioId);

    if (portfolioSectionsOrError.isFailure())
      return failure(portfolioSectionsOrError.value);

    const section = portfolioSectionsOrError.value;
    return success(section);
  };
