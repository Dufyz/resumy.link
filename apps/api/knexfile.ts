require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: "./src/infra/database/migrations",
    },
    seeds: {
      directory: "./src/infra/database/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DB_CONNECTION,
    migrations: {
      directory: "./src/infra/database/migrations",
    },
    ssl: { rejectUnauthorized: false },
  },
  test: {
    client: "pg",
    connection: process.env.DB_TEST_CONNECTION,
    migrations: {
      directory: "./src/infra/database/migrations",
    },
  },
};
