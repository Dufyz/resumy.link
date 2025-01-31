import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE sections (
            id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            portfolio_id BIGINT NOT NULL REFERENCES portfolios(id),
            is_active BOOLEAN DEFAULT TRUE,
            type VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );    
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TABLE IF EXISTS sections;
    `);
}
