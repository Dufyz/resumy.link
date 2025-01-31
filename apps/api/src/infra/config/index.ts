require("dotenv").config();

export const NODE_ENV = process.env.NODE_ENV || "development";

export const SERVER_PORT = process.env.PORT || 4000;
export const DB_CONNECTION = process.env.DB_CONNECTION as string;
export const DB_TEST_CONNECTION = process.env.DB_TEST_CONNECTION as string;
