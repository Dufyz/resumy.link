import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE users (
            id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            avatar_path TEXT NULL,
            portfolio_limit INT NOT NULL DEFAULT 0,
            plan_type VARCHAR(20) CHECK (plan_type IN ('free', 'standard', 'lifetime')) NOT NULL DEFAULT 'free',
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TABLE IF EXISTS users;
    `);
}
