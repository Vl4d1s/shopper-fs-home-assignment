import sqlite3 from "sqlite3";
import type { Database } from "sqlite";
import { open } from "sqlite";

export async function getDatabaseConnection(): Promise<Database> {
  return open({
    filename: "src/data/database.db",
    driver: sqlite3.Database,
  });
}
