import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE users (
            id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
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
