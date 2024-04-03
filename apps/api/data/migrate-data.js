const fs = require("node:fs");
const csvParser = require("csv-parser");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function importCSV() {
  const db = await open({
    filename: "../src/data/database.db",
    driver: sqlite3.Database,
  });

  fs.createReadStream("../src/data/performance-metrics.csv")
    .pipe(csvParser())
    .on("data", async (row) => {
      await db.run(
        `INSERT INTO performance_metrics (category_name, date, product_views, revenue, units_sold)
        VALUES (?, ?, ?, ?, ?)`,
        [
          row.category_name,
          row.date,
          row.product_views,
          row.revenue,
          row.units_sold,
        ]
      );
    })
    .on("end", () => {
      console.log("CSV file has been imported into the database.");
    });
}

importCSV().catch(console.error);
