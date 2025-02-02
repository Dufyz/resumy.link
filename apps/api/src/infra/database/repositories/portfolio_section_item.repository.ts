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
  create: async (body) => {
    try {
      const portfolioSectionItemToCreate: Pick<
        PortfolioSectionItem,
        "portfolio_id" | "portfolio_section_id"
      > = {
        portfolio_id: body.portfolio_id,
        portfolio_section_id: body.portfolio_section_id,
      };

      const colsToInsert = Object.keys(
        portfolioSectionItemToCreate
      ) as (keyof typeof portfolioSectionItemToCreate)[];

      const [sectionItem] = await sql`
        INSERT INTO portfolio_section_items ${sql(
          portfolioSectionItemToCreate,
          colsToInsert
        )}
        RETURNING id, portfolio_id, portfolio_section_id, created_at, updated_at
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
        Pick<PortfolioSectionItem, "id">
      > = filterObjNullishValues({
        id: body.id,
      });

      const colsToUpdate = Object.keys(
        portfolioSectionItemToUpdate
      ) as (keyof typeof portfolioSectionItemToUpdate)[];

      const [sectionItem] = await sql`
        UPDATE portfolio_section_items
        SET ${sql(portfolioSectionItemToUpdate, colsToUpdate)}
        WHERE id = ${id}
        RETURNING id, portfolio_id, portfolio_section_id, created_at, updated_at
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
