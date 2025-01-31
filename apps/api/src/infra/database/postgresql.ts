import postgres from "postgres";
import { DB_CONNECTION, DB_TEST_CONNECTION, NODE_ENV } from "../config";

if (!DB_CONNECTION) throw new Error("Check DB_CONNECTION env");

const sql = postgres(NODE_ENV === "test" ? DB_TEST_CONNECTION : DB_CONNECTION, {
  prepare: false,
  // debug(connection, query, parameters, paramTypes) {
  //   console.log({ connection, query, parameters });
  // },
  connect_timeout: 6000,
  idle_timeout: 8000,
  onclose(connId) {
    console.log(`Connection ${connId} closed`);
  },
});

const query = sql``;

export type SQLQuery = typeof query;

export default sql;
