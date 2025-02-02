import { PortfolioSection } from "../../../../domain/portfolio/portfolio_section";
import { Either, failure, success } from "../../../../shared/utils/either";
import { RepositoryErrors } from "../../../errors";
import { PortfolioSectionRepository } from "../../../interfaces/portfolio_section.repository";

export const updatePortfolioSection =
  (portfolioSectionRepository: PortfolioSectionRepository) =>
  async (
    id: number,
    body: Partial<Pick<PortfolioSection, "type" | "is_active">>
  ): Promise<Either<RepositoryErrors, PortfolioSection>> => {
    const portfolioSectionOrError = await portfolioSectionRepository.update(
      id,
      {
        type: body.type,
        is_active: body.is_active,
      }
    );

    if (portfolioSectionOrError.isFailure())
      return failure(portfolioSectionOrError.value);

    const section = portfolioSectionOrError.value;
    return success(section);
  };
