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
  listByPortfolioId: async (portfolio_id) => {
    try {
      const portfolioSections = await sql`
        SELECT
          ps.id,
          ps.portfolio_id,
          ps.is_active,
          ps.type,
          ps.title,
          ps.index,
          ps.created_at,
          ps.updated_at
        FROM portfolio_sections ps
        WHERE portfolio_id = ${portfolio_id}
      `;

      return success(
        portfolioSections.map((portfolioSection) =>
          parsePortfolioSectionFromDB(portfolioSection as PortfolioSection)
        )
      );
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  create: async (body) => {
    try {
      const portfolioSectionToCreate: Pick<
        PortfolioSection,
        "portfolio_id" | "type" | "is_active" | "title"
      > = {
        portfolio_id: body.portfolio_id,
        is_active: body.is_active,
        type: body.type,
        title: body.title,
      };

      const colsToInsert = Object.keys(
        portfolioSectionToCreate
      ) as (keyof typeof portfolioSectionToCreate)[];

      const [portfolioSection] = await sql`
        INSERT INTO portfolio_sections ${sql(
          portfolioSectionToCreate,
          colsToInsert
        )}
        RETURNING id, portfolio_id, is_active, type, title, index, created_at, updated_at
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
        Pick<
          PortfolioSection,
          "type" | "is_active" | "title" | "index" | "updated_at"
        >
      > = filterObjNullishValues({
        type: body.type,
        is_active: body.is_active,
        title: body.title,
        index: body.index,
        updated_at: new Date(),
      });

      const colsToUpdate = Object.keys(
        portfolioSectionToUpdate
      ) as (keyof typeof portfolioSectionToUpdate)[];

      const [portfolioSection] = await sql`
        UPDATE portfolio_sections
        SET ${sql(portfolioSectionToUpdate, colsToUpdate)}
        WHERE id = ${id}
        RETURNING id, portfolio_id, is_active, type, title, index, created_at, updated_at
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
