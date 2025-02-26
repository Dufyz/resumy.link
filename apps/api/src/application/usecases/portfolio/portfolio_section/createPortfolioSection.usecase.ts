import { PortfolioSection } from "../../../../domain/portfolio/portfolio_section";
import { Either, failure, success } from "../../../../shared/utils/either";
import { RepositoryErrors } from "../../../errors";
import { PortfolioSectionRepository } from "../../../interfaces/portfolio_section.repository";

export const createPortfolioSection =
  (portfolioSectionRepository: PortfolioSectionRepository) =>
  async (
    body: Pick<
      PortfolioSection,
      "portfolio_id" | "type" | "is_active" | "title"
    >
  ): Promise<Either<RepositoryErrors, PortfolioSection>> => {
    const portfolioSectionOrError = await portfolioSectionRepository.create({
      portfolio_id: body.portfolio_id,
      type: body.type,
      is_active: body.is_active,
      title: body.title,
    });

    if (portfolioSectionOrError.isFailure())
      return failure(portfolioSectionOrError.value);

    const section = portfolioSectionOrError.value;
    return success(section);
  };
