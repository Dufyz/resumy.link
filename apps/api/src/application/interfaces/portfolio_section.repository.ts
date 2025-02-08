import { PortfolioSection } from "../../domain/portfolio/portfolio_section";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type PortfolioSectionRepository = {
  listByPortfolioId(
    portfolio_id: number
  ): Promise<Either<RepositoryErrors, PortfolioSection[]>>;
  create(
    body: Pick<
      PortfolioSection,
      "portfolio_id" | "type" | "is_active" | "title"
    >
  ): Promise<Either<RepositoryErrors, PortfolioSection>>;
  update(
    id: number,
    body: Partial<
      Pick<PortfolioSection, "type" | "is_active" | "title" | "index">
    >
  ): Promise<Either<RepositoryErrors, PortfolioSection>>;
  delete(id: number): Promise<Either<RepositoryErrors, void>>;
};
