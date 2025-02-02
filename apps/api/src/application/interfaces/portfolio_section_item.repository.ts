import { PortfolioSectionItem } from "../../domain/portfolio/portfolio_section_item";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type PortfolioSectionItemRepository = {
  create(
    body: Pick<PortfolioSectionItem, "portfolio_id" | "portfolio_section_id">
  ): Promise<Either<RepositoryErrors, PortfolioSectionItem>>;
  update(
    id: number,
    body: Partial<Pick<PortfolioSectionItem, "id">>
  ): Promise<Either<RepositoryErrors, PortfolioSectionItem>>;
  delete(id: number): Promise<Either<RepositoryErrors, void>>;
};
