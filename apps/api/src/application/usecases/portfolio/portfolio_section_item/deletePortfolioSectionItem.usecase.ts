import { Either, failure, success } from "../../../../shared/utils/either";
import { RepositoryErrors } from "../../../errors";
import { PortfolioSectionItemRepository } from "../../../interfaces/portfolio_section_item.repository";

export const deletePortfolioSectionItem =
  (portfolioSectionItemRepository: PortfolioSectionItemRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, void>> => {
    const resultOrError = await portfolioSectionItemRepository.delete(id);

    if (resultOrError.isFailure()) return failure(resultOrError.value);

    return success(undefined);
  };
