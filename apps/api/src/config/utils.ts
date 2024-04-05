import path from "node:path";

export function getDbPath() {
  return path.resolve("src", "data", "database.db");
}
