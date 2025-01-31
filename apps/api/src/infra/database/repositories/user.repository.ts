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
          u.username,
          u.email,
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
          u.username,
          u.email,
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
  findByUsername: async (username) => {
    try {
      const [user] = await sql`
        SELECT 
          u.id,
          u.name,
          u.username,
          u.email,
          u.created_at,
          u.updated_at
        FROM users u
        WHERE u.username = ${username}
      `;

      if (!user) return success(null);

      return success(parseUserFromDB(user as User));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  create: async (body) => {
    try {
      const userToCreate: Pick<User, "name" | "username" | "email"> = {
        name: body.name,
        username: body.username,
        email: body.email,
      };

      const colsToInsert = Object.keys(
        userToCreate
      ) as (keyof typeof userToCreate)[];

      const [user] = await sql`
        INSERT INTO users ${sql(userToCreate, colsToInsert)}
        RETURNING id, name, username, email, created_at, updated_at
      `;

      return success(parseUserFromDB(user as User));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const userToUpdate: Partial<
        Pick<User, "name" | "username" | "email" | "updated_at">
      > = filterObjNullishValues({
        name: body.name,
        username: body.username,
        email: body.email,
        updated_at: new Date(),
      });

      const colsToUpdate = Object.keys(
        userToUpdate
      ) as (keyof typeof userToUpdate)[];

      const [user] = await sql`
        UPDATE users
        SET ${sql(userToUpdate, colsToUpdate)}
        WHERE id = ${id}
        RETURNING id, name, username, email, created_at, updated_at
      `;

      return success(parseUserFromDB(user as User));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
