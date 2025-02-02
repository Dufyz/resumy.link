import { PortfolioSection } from "../../domain/portfolio/portfolio_sections";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type PortfolioSectionRepository = {
  create(
    body: Pick<PortfolioSection, "portfolio_id" | "type" | "is_active">
  ): Promise<Either<RepositoryErrors, PortfolioSection>>;
  update(
    id: number,
    body: Partial<Pick<PortfolioSection, "type" | "is_active">>
  ): Promise<Either<RepositoryErrors, PortfolioSection>>;
  delete(id: number): Promise<Either<RepositoryErrors, void>>;
};
