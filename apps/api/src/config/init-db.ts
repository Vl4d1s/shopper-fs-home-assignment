import { getDatabaseConnection } from "./database-connection";

export async function initDB() {
  const db = await getDatabaseConnection();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_name TEXT NOT NULL,
      date TEXT NOT NULL,
      product_views INTEGER NOT NULL,
      revenue INTEGER NOT NULL,
      units_sold INTEGER NOT NULL
    );
  `);

  console.log("Database initialized and table created.");
}
