import { PortfolioSectionItem } from "../../domain/portfolio/portfolio_section_item";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type PortfolioSectionItemRepository = {
  listByPortfolioId(
    portfolio_id: number
  ): Promise<Either<RepositoryErrors, PortfolioSectionItem[]>>;
  create(
    body: Pick<
      PortfolioSectionItem,
      "portfolio_id" | "portfolio_section_id" | "is_active" | "metadata"
    >
  ): Promise<Either<RepositoryErrors, PortfolioSectionItem>>;
  update(
    id: number,
    body: Partial<
      Pick<PortfolioSectionItem, "is_active" | "index" | "metadata">
    >
  ): Promise<Either<RepositoryErrors, PortfolioSectionItem>>;
  delete(id: number): Promise<Either<RepositoryErrors, void>>;
};
