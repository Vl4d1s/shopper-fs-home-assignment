import { initDB } from "./init-db";
import { migrateData } from "./migrate-data";

export async function setupDatabase() {
  await initDB();
  await migrateData();
  console.log("Database initialized and migrated successfully.");
}
