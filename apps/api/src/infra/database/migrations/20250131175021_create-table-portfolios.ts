import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE portfolios (
            id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            user_id BIGINT NOT NULL UNIQUE REFERENCES users(id),
            username VARCHAR(255) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL,
            bio TEXT NULL,
            avatar_path TEXT NULL,
            metadata JSONB NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TABLE IF EXISTS portfolios;
    `);
}
