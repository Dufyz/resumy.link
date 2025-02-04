import { PortfolioSectionItem } from "../../../../domain/portfolio/portfolio_section_item";
import { Either, failure, success } from "../../../../shared/utils/either";
import { RepositoryErrors } from "../../../errors";
import { PortfolioSectionItemRepository } from "../../../interfaces/portfolio_section_item.repository";

export const listPortfolioSectionItemsByPortfolioId =
  (portfolioSectionItemRepository: PortfolioSectionItemRepository) =>
  async (
    portfolioId: number
  ): Promise<Either<RepositoryErrors, PortfolioSectionItem[]>> => {
    const portfolioSectionItemsOrError =
      await portfolioSectionItemRepository.listByPortfolioId(portfolioId);

    if (portfolioSectionItemsOrError.isFailure())
      return failure(portfolioSectionItemsOrError.value);

    const portfolioSectionItem = portfolioSectionItemsOrError.value;
    return success(portfolioSectionItem);
  };
