import { PortfolioSectionItem } from "../../../../domain/portfolio/portfolio_section_item";
import { Either, failure, success } from "../../../../shared/utils/either";
import { RepositoryErrors } from "../../../errors";
import { PortfolioSectionItemRepository } from "../../../interfaces/portfolio_section_item.repository";

export const createPortfolioSectionItem =
  (portfolioSectionItemRepository: PortfolioSectionItemRepository) =>
  async (
    body: Pick<
      PortfolioSectionItem,
      "portfolio_id" | "portfolio_section_id" | "is_active" | "metadata"
    >
  ): Promise<Either<RepositoryErrors, PortfolioSectionItem>> => {
    const portfolioSectionItemOrError =
      await portfolioSectionItemRepository.create({
        portfolio_id: body.portfolio_id,
        portfolio_section_id: body.portfolio_section_id,
        is_active: body.is_active,
        metadata: body.metadata,
      });

    if (portfolioSectionItemOrError.isFailure())
      return failure(portfolioSectionItemOrError.value);

    const portfolioSectionItem = portfolioSectionItemOrError.value;
    return success(portfolioSectionItem);
  };
