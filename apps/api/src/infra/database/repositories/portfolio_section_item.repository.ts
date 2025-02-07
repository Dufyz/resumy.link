import { getRepositoryError } from "../../../application/errors";
import { PortfolioSectionItemRepository } from "../../../application/interfaces/portfolio_section_item.repository";
import {
  parsePortfolioSectionItemFromDB,
  PortfolioSectionItem,
} from "../../../domain/portfolio/portfolio_section_item";
import { failure, success } from "../../../shared/utils/either";
import { filterObjNullishValues } from "../../../shared/utils/filterObjNullishValues";
import sql from "../postgresql";

export const portfolioSectionItemRepository: PortfolioSectionItemRepository = {
  listByPortfolioId: async (portfolio_id) => {
    try {
      const portfolioSectionItems = await sql`
        SELECT
          psi.id,
          psi.portfolio_id,
          psi.portfolio_section_id,
          psi.is_active,
          psi.metadata,
          psi.created_at,
          psi.updated_at
        FROM portfolio_section_items psi
        WHERE portfolio_id = ${portfolio_id}
      `;

      return success(
        portfolioSectionItems.map((portfolioSectionItem) =>
          parsePortfolioSectionItemFromDB(
            portfolioSectionItem as PortfolioSectionItem
          )
        )
      );
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  create: async (body) => {
    try {
      const portfolioSectionItemToCreate: Pick<
        PortfolioSectionItem,
        "portfolio_id" | "portfolio_section_id" | "is_active" | "metadata"
      > = {
        portfolio_id: body.portfolio_id,
        portfolio_section_id: body.portfolio_section_id,
        is_active: body.is_active,
        metadata: body.metadata,
      };

      const colsToInsert = Object.keys(
        portfolioSectionItemToCreate
      ) as (keyof typeof portfolioSectionItemToCreate)[];

      const [sectionItem] = await sql`
        INSERT INTO portfolio_section_items ${sql(
          portfolioSectionItemToCreate,
          colsToInsert
        )}
        RETURNING id, portfolio_id, portfolio_section_id, is_active, metadata, created_at, updated_at
      `;

      return success(
        parsePortfolioSectionItemFromDB(sectionItem as PortfolioSectionItem)
      );
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const portfolioSectionItemToUpdate: Partial<
        Pick<PortfolioSectionItem, "is_active" | "metadata">
      > = filterObjNullishValues({
        is_active: body.is_active,
        metadata: body.metadata,
      });

      const colsToUpdate = Object.keys(
        portfolioSectionItemToUpdate
      ) as (keyof typeof portfolioSectionItemToUpdate)[];

      const [sectionItem] = await sql`
        UPDATE portfolio_section_items
        SET ${sql(portfolioSectionItemToUpdate, colsToUpdate)}
        WHERE id = ${id}
        RETURNING id, portfolio_id, portfolio_section_id, is_active, metadata, created_at, updated_at
      `;

      return success(
        parsePortfolioSectionItemFromDB(sectionItem as PortfolioSectionItem)
      );
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  delete: async (id) => {
    try {
      await sql`
            DELETE FROM portfolio_section_items
            WHERE id = ${id}
        `;

      return success(undefined);
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
