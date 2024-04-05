import fs from "node:fs";
import { initDB } from "./init-db";
import { migrateData } from "./migrate-data";
import { getDbPath } from "./utils";

export async function setupDatabase() {
  if (!fs.existsSync(getDbPath())) {
    await initDB();
    await migrateData();
    console.log("Database initialized and migrated successfully.");
  } else {
    console.log("Database already exists. No need to initialize and migrate.");
  }
}
