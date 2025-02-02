import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE portfolio_section_items (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            portfolio_id BIGINT NOT NULL REFERENCES portfolios(id),
            portfolio_section_id BIGINT NOT NULL REFERENCES portfolio_sections(id),
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
            DROP TABLE IF EXISTS portfolio_section_items;
        `);
}
