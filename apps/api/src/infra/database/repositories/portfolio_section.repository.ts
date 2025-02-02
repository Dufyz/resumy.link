import { getRepositoryError } from "../../../application/errors";
import { PortfolioSectionRepository } from "../../../application/interfaces/portfolio_section.repository";
import {
  parsePortfolioSectionFromDB,
  PortfolioSection,
} from "../../../domain/portfolio/portfolio_section";
import { failure, success } from "../../../shared/utils/either";
import { filterObjNullishValues } from "../../../shared/utils/filterObjNullishValues";
import sql from "../postgresql";

export const portfolioSectionRepository: PortfolioSectionRepository = {
  create: async (body) => {
    try {
      const portfolioSectionToCreate: Pick<
        PortfolioSection,
        "portfolio_id" | "type" | "is_active"
      > = {
        portfolio_id: body.portfolio_id,
        is_active: body.is_active,
        type: body.type,
      };

      const colsToInsert = Object.keys(
        portfolioSectionToCreate
      ) as (keyof typeof portfolioSectionToCreate)[];

      const [portfolioSection] = await sql`
        INSERT INTO portfolio_sections ${sql(
          portfolioSectionToCreate,
          colsToInsert
        )}
        RETURNING id, portfolio_id, is_active, type, created_at, updated_at
      `;

      return success(
        parsePortfolioSectionFromDB(portfolioSection as PortfolioSection)
      );
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const portfolioSectionToUpdate: Partial<
        Pick<PortfolioSection, "type" | "is_active">
      > = filterObjNullishValues({
        type: body.type,
        is_active: body.is_active,
      });

      const colsToUpdate = Object.keys(
        portfolioSectionToUpdate
      ) as (keyof typeof portfolioSectionToUpdate)[];

      const [portfolioSection] = await sql`
        UPDATE portfolio_sections
        SET ${sql(portfolioSectionToUpdate, colsToUpdate)}
        WHERE id = ${id}
        RETURNING id, portfolio_id, is_active, type, created_at, updated_at
      `;

      return success(
        parsePortfolioSectionFromDB(portfolioSection as PortfolioSection)
      );
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  delete: async (id) => {
    try {
      await sql`
            DELETE FROM portfolio_sections
            WHERE id = ${id}
        `;

      return success(undefined);
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
