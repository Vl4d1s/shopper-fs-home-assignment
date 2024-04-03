const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

(async () => {
  const db = await open({
    filename: "../src/data/database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS metrics_raw (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      date TEXT NOT NULL,
      product_views INTEGER,
      revenue INTEGER,
      units_sold INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS metrics_aggregated (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      date TEXT NOT NULL,
      product_views_total INTEGER DEFAULT 0,
      revenue_total INTEGER DEFAULT 0,
      units_sold_total INTEGER DEFAULT 0,
      UNIQUE(category_id, date),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  console.log("Database and tables have been created.");
  await db.close();
})();
