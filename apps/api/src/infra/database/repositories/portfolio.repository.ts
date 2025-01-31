import { getRepositoryError } from "../../../application/errors";
import { PortfolioRepository } from "../../../application/interfaces/portfolio.repository";
import { parsePortfolioFromDB, Portfolio } from "../../../domain/portfolio";
import { failure, success } from "../../../shared/utils/either";
import { filterObjNullishValues } from "../../../shared/utils/filterObjNullishValues";
import sql from "../postgresql";

export const portfolioRepository: PortfolioRepository = {
  findById: async (id) => {
    try {
      const [portfolio] = await sql`
        SELECT 
          p.id,
          p.user_id,
          p.name,
          p.created_at,
          p.updated_at
        FROM portfolios p
        WHERE p.id = ${id}
      `;

      if (!portfolio) return success(null);

      return success(parsePortfolioFromDB(portfolio as Portfolio));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  findByName: async (name) => {
    try {
      const [portfolio] = await sql`
        SELECT 
          p.id,
          p.user_id,
          p.name,
          p.created_at,
          p.updated_at
        FROM portfolios p
        WHERE p.name = ${name}
      `;

      if (!portfolio) return success(null);

      return success(parsePortfolioFromDB(portfolio as Portfolio));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  create: async (body) => {
    try {
      const portfolioToCreate: Pick<Portfolio, "user_id" | "name"> = {
        user_id: body.user_id,
        name: body.name,
      };

      const colsToInsert = Object.keys(
        portfolioToCreate
      ) as (keyof typeof portfolioToCreate)[];

      const [portfolio] = await sql`
        INSERT INTO portfolios ${sql(portfolioToCreate, colsToInsert)}
        RETURNING id, name, user_id, created_at, updated_at
      `;

      return success(parsePortfolioFromDB(portfolio as Portfolio));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const portfolioToUpdate: Partial<Pick<Portfolio, "name" | "updated_at">> =
        filterObjNullishValues({
          name: body.name,
          updated_at: new Date(),
        });

      const colsToUpdate = Object.keys(
        portfolioToUpdate
      ) as (keyof typeof portfolioToUpdate)[];

      const [portfolio] = await sql`
        UPDATE portfolios
        SET ${sql(portfolioToUpdate, colsToUpdate)}
        WHERE id = ${id}
        RETURNING id, name, user_id, created_at, updated_at
      `;

      return success(parsePortfolioFromDB(portfolio as Portfolio));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
