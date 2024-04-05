import { createServer } from "./server";
import { setupDatabase } from "./config/database-setup";

void (async () => {
  try {
    await setupDatabase();
    const port = process.env.PORT || 5001;
    const server = createServer();

    server.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to setup database or start the server:", error);
  }
})();
