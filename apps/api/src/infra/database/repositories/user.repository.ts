import { getRepositoryError } from "../../../application/errors";
import { UserRepository } from "../../../application/interfaces/user.repository";
import { parseUserFromDB, User } from "../../../domain/user";
import { failure, success } from "../../../shared/utils/either";
import { filterObjNullishValues } from "../../../shared/utils/filterObjNullishValues";
import sql from "../postgresql";

export const userRepository: UserRepository = {
  findById: async (id) => {
    try {
      const [user] = await sql`
        SELECT 
          u.id,
          u.name,
          u.email,
          u.avatar_path,
          u.portfolio_limit,
          u.plan_type,
          u.created_at,
          u.updated_at
        FROM users u
        WHERE u.id = ${id}
      `;

      if (!user) return success(null);

      return success(parseUserFromDB(user as User));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  findByEmail: async (email) => {
    try {
      const [user] = await sql`
        SELECT 
          u.id,
          u.name,
          u.email,
          u.avatar_path,
          u.portfolio_limit,
          u.plan_type,
          u.created_at,
          u.updated_at
        FROM users u
        WHERE u.email = ${email}
      `;

      if (!user) return success(null);

      return success(parseUserFromDB(user as User));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  create: async (body) => {
    try {
      const userToCreate: Pick<User, "name" | "email"> = {
        name: body.name,
        email: body.email,
      };

      const colsToInsert = Object.keys(
        userToCreate
      ) as (keyof typeof userToCreate)[];

      const [user] = await sql`
        INSERT INTO users ${sql(userToCreate, colsToInsert)}
        RETURNING id, name, email, avatar_path, portfolio_limit, plan_type, created_at, updated_at
      `;

      return success(parseUserFromDB(user as User));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const userToUpdate: Partial<
        Pick<
          User,
          | "name"
          | "email"
          | "avatar_path"
          | "portfolio_limit"
          | "plan_type"
          | "updated_at"
        >
      > = filterObjNullishValues({
        name: body.name,
        email: body.email,
        plan_type: body.plan_type,
        portfolio_limit: body.portfolio_limit,
        avatar_path: body.avatar_path,
        updated_at: new Date(),
      });

      if (body.avatar_path === null) userToUpdate.avatar_path = null;

      const colsToUpdate = Object.keys(
        userToUpdate
      ) as (keyof typeof userToUpdate)[];

      const [user] = await sql`
        UPDATE users
        SET ${sql(userToUpdate, colsToUpdate)}
        WHERE id = ${id}
        RETURNING id, name, email, avatar_path, portfolio_limit, plan_type, created_at, updated_at
      `;

      return success(parseUserFromDB(user as User));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
