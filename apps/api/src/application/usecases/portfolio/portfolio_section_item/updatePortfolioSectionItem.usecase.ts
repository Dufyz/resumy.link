import { PortfolioSectionItem } from "../../../../domain/portfolio/portfolio_section_item";
import { Either, failure, success } from "../../../../shared/utils/either";
import { RepositoryErrors } from "../../../errors";
import { PortfolioSectionItemRepository } from "../../../interfaces/portfolio_section_item.repository";

export const updatePortfolioSectionItem =
  (portfolioSectionItemRepository: PortfolioSectionItemRepository) =>
  async (
    id: number,
    body: Partial<Pick<PortfolioSectionItem, "id">>
  ): Promise<Either<RepositoryErrors, PortfolioSectionItem>> => {
    const portfolioSectionItemOrError =
      await portfolioSectionItemRepository.update(id, {
        id: body.id,
      });

    if (portfolioSectionItemOrError.isFailure())
      return failure(portfolioSectionItemOrError.value);

    const portfolioSectionItem = portfolioSectionItemOrError.value;
    return success(portfolioSectionItem);
  };
