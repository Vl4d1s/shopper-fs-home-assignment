const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

(async () => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  try {
    // Retrieve all data from metrics_raw
    const rawMetricsData = await db.all("SELECT * FROM metrics_raw");
    console.log("Raw Metrics Data:");
    console.table(rawMetricsData);

    // Retrieve all data from metrics_aggregated
    const aggregatedMetricsData = await db.all(
      "SELECT * FROM metrics_aggregated"
    );
    console.log("Aggregated Metrics Data:");
    console.table(aggregatedMetricsData);
  } catch (error) {
    console.error("Failed to retrieve data:", error);
  } finally {
    await db.close(); // Ensure the database is always closed
  }
})();
