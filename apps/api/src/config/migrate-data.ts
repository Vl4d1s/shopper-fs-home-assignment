import fs from "node:fs";
import path from "node:path";
import csvParser from "csv-parser";
import type { MetricRawData } from "../types";
import { getDatabaseConnection } from "./database-connection";

export async function migrateData() {
  const db = await getDatabaseConnection();

  await db.exec("BEGIN TRANSACTION");

  const insertStmt = await db.prepare(`
    INSERT INTO metrics (category_name, date, product_views, revenue, units_sold)
    VALUES (?, ?, ?, ?, ?)
  `);

  fs.createReadStream(path.resolve("src", "data", "metrics.csv"))
    .pipe(csvParser())
    .on("data", async (row) => {
      const { category_name, date, product_views, revenue, units_sold } =
        row as MetricRawData;
      await insertStmt.run(
        category_name,
        date,
        product_views,
        revenue,
        units_sold
      );
    })
    .on("end", async () => {
      await insertStmt.finalize();
      await db.exec("COMMIT");
      console.log("Data migration completed.");
      void db.close();
    })
    .on("error", (err) => {
      console.error("An error occurred during the CSV file processing", err);
    });
}
