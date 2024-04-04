import { initDB } from "./config/init-db";
import { createServer } from "./server";
import { migrateData } from "./config/migrate-data";

void (async () => {
  await initDB();
  await migrateData();
})();

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
