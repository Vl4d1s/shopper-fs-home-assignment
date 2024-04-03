const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function initDB() {
  const db = await open({
    filename: "../src/data/database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS performance_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL,
    date TEXT NOT NULL,
    product_views INTEGER,
    revenue INTEGER,
    units_sold INTEGER
  )`);

  console.log("Database and table have been created.");
}

initDB().catch(console.error);
