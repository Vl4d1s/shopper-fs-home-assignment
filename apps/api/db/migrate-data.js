const fs = require("fs");
const csvParser = require("csv-parser");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

(async () => {
  const db = await open({
    filename: "../src/data/database.db",
    driver: sqlite3.Database,
  });

  try {
    await db.run("BEGIN"); // Start a transaction

    const parser = csvParser();
    fs.createReadStream("../src/data/performance-metrics.csv").pipe(parser);

    parser.on("data", async (row) => {
      try {
        // Processing the row inside a transaction
        let category = await db.get(
          `SELECT id FROM categories WHERE name = ?`,
          row.category_name
        );
        if (!category) {
          const result = await db.run(
            `INSERT INTO categories (name) VALUES (?)`,
            row.category_name
          );
          category = { id: result.lastID };
        }

        // Insert the raw metric
        await db.run(
          `
          INSERT INTO metrics_raw (category_id, date, product_views, revenue, units_sold)
          VALUES (?, ?, ?, ?, ?)
        `,
          [
            category.id,
            row.date,
            row.product_views,
            row.revenue,
            row.units_sold,
          ]
        );

        // Upsert the aggregate data
        const [year, month] = row.date.split("-");
        const formattedDate = `${year}-${month}`;
        await db.run(
          `
          INSERT INTO metrics_aggregated (category_id, date, product_views_total, revenue_total, units_sold_total)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(category_id, date) 
          DO UPDATE SET
            product_views_total = product_views_total + excluded.product_views_total,
            revenue_total = revenue_total + excluded.revenue_total,
            units_sold_total = units_sold_total + excluded.units_sold_total
        `,
          [
            category.id,
            formattedDate,
            row.product_views,
            row.revenue,
            row.units_sold,
          ]
        );
      } catch (e) {
        console.error("Failed to insert row:", row);
      }
    });

    parser.on("end", async () => {
      await db.run("COMMIT"); // Commit the transaction
      console.log("CSV file has been imported and data aggregated.");
      await db.close();
    });

    parser.on("error", async (error) => {
      await db.run("ROLLBACK"); // Rollback on any error during CSV processing
      console.error("Error during CSV processing:", error);
      await db.close();
    });
  } catch (error) {
    console.error("Failed to migrate data:", error);
    await db.run("ROLLBACK"); // Rollback transaction if there's an error outside CSV processing
    await db.close();
  }
})();
