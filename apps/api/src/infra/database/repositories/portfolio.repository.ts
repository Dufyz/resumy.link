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
          p.username,
          p.title,
          p.bio,
          p.avatar_path,
          P.is_active,
          p.metadata,
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
  findByUsername: async (name) => {
    try {
      const [portfolio] = await sql`
        SELECT 
          p.id,
          p.user_id,
          p.username,
          p.title,
          p.bio,
          p.avatar_path,
          p.is_active,
          p.metadata,
          p.created_at,
          p.updated_at
        FROM portfolios p
        WHERE p.username = ${name}
      `;

      if (!portfolio) return success(null);

      return success(parsePortfolioFromDB(portfolio as Portfolio));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  findByUserId: async (userId) => {
    try {
      const [portfolio] = await sql`
        SELECT 
          p.id,
          p.user_id,
          p.username,
          p.title,
          p.bio,
          p.avatar_path,
          p.is_active,
          p.metadata,
          p.created_at,
          p.updated_at
        FROM portfolios p
        WHERE p.user_id = ${userId}
      `;

      if (!portfolio) return success(null);

      return success(parsePortfolioFromDB(portfolio as Portfolio));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  checkUsernameAvailability: async (username) => {
    try {
      const [portfolio] = await sql`
        SELECT 
          p.id
        FROM portfolios p
        WHERE p.username = ${username}
      `;

      return success(!!portfolio);
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  countActivePortfoliosByUserId: async (userId) => {
    try {
      const [result] = await sql`
        SELECT 
          COUNT(*) as count
        FROM portfolios p
        WHERE p.user_id = ${userId} AND p.is_active = true
      `;

      return success(result.count);
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  create: async (body) => {
    try {
      const portfolioToCreate: Pick<
        Portfolio,
        "user_id" | "username" | "title" | "bio" | "avatar_path"
      > = {
        user_id: body.user_id,
        username: body.username,
        title: body.title,
        bio: body.bio,
        avatar_path: body.avatar_path,
      };

      const colsToInsert = Object.keys(
        portfolioToCreate
      ) as (keyof typeof portfolioToCreate)[];

      const [portfolio] = await sql`
        INSERT INTO portfolios ${sql(portfolioToCreate, colsToInsert)}
        RETURNING id, user_id, username, title, bio, avatar_path, metadata, is_active, created_at, updated_at
      `;

      return success(parsePortfolioFromDB(portfolio as Portfolio));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const portfolioToUpdate: Partial<
        Pick<
          Portfolio,
          | "username"
          | "title"
          | "bio"
          | "avatar_path"
          | "is_active"
          | "metadata"
          | "updated_at"
        >
      > = filterObjNullishValues({
        username: body.username,
        title: body.title,
        bio: body.bio,
        avatar_path: body.avatar_path,
        is_active: body.is_active,
        metadata: body.metadata,
        updated_at: new Date(),
      });

      if (body.avatar_path === null) portfolioToUpdate.avatar_path = null;

      const colsToUpdate = Object.keys(
        portfolioToUpdate
      ) as (keyof typeof portfolioToUpdate)[];

      const [portfolio] = await sql`
        UPDATE portfolios
        SET ${sql(portfolioToUpdate, colsToUpdate)}
        WHERE id = ${id}
        RETURNING id, user_id, username, title, bio, avatar_path, is_active, metadata, created_at, updated_at
      `;

      return success(parsePortfolioFromDB(portfolio as Portfolio));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
