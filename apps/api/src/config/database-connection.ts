import path from "node:path";
import { Database } from "sqlite3";
import type { Database as DatabaseType } from "sqlite";
import { open } from "sqlite";

export async function getDatabaseConnection(): Promise<DatabaseType> {
  return open({
    filename: path.resolve("src", "data", "database.db"),
    driver: Database,
  });
}
