import { getRepositoryError } from "../../../application/errors";
import { SectionRepository } from "../../../application/interfaces/section.repository";
import { parseSectionFromDB, Section } from "../../../domain/section";
import { failure, success } from "../../../shared/utils/either";
import { filterObjNullishValues } from "../../../shared/utils/filterObjNullishValues";
import sql from "../postgresql";

export const sectionRepository: SectionRepository = {
  create: async (body) => {
    try {
      const sectionToCreate: Pick<
        Section,
        "portfolio_id" | "type" | "is_active"
      > = {
        portfolio_id: body.portfolio_id,
        is_active: body.is_active,
        type: body.type,
      };

      const colsToInsert = Object.keys(
        sectionToCreate
      ) as (keyof typeof sectionToCreate)[];

      const [section] = await sql`
        INSERT INTO sections ${sql(sectionToCreate, colsToInsert)}
        RETURNING id, portfolio_id, is_active, type, created_at, updated_at
      `;

      return success(parseSectionFromDB(section as Section));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  update: async (id, body) => {
    try {
      const sectionToUpdate: Partial<Pick<Section, "type" | "is_active">> =
        filterObjNullishValues({
          type: body.type,
          is_active: body.is_active,
        });

      const colsToUpdate = Object.keys(
        sectionToUpdate
      ) as (keyof typeof sectionToUpdate)[];

      const [section] = await sql`
        UPDATE sections
        SET ${sql(sectionToUpdate, colsToUpdate)}
        WHERE id = ${id}
        RETURNING id, portfolio_id, is_active, type, created_at, updated_at
      `;

      return success(parseSectionFromDB(section as Section));
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
  delete: async (id) => {
    try {
      await sql`
            DELETE FROM sections
            WHERE id = ${id}
        `;

      return success(undefined);
    } catch (e: any) {
      return failure(getRepositoryError(e));
    }
  },
};
