import { Database } from "sqlite3";
import type { Database as DatabaseType } from "sqlite";
import { open } from "sqlite";
import { getDbPath } from "./utils";

export async function getDatabaseConnection(): Promise<DatabaseType> {
  return open({
    filename: getDbPath(),
    driver: Database,
  });
}
