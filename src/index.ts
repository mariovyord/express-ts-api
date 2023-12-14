import app from "./app";
import db from "./config/db";
import getConfig from "./config/get-config";
import dotenv from "dotenv";
import { AppError } from "./utils/app-error";

/**
 * Load enviroment variables
 */
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const config = getConfig();
const port: number = config.PORT ? parseInt(config.PORT) : 5000;
const dbConnectionString =
  config.CONNECTION_STRING || "mongodb://localhost:27017/express-template";

(async function () {
  await db(dbConnectionString);

  app.listen(port, () =>
    console.log(`⚡️ Server is listening on port ${port}...`)
  );
})();

// Uncaught exception and SIGTERM handling
process.on("uncaughtException", (err: Error | AppError) => {
  console.error("Uncaught Exception:", err);
  // Perform necessary cleanup or logging
  if (!("isOperational" in err) || err.isOperational === false) {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM signal");
  // Perform cleanup tasks
  process.exit(0); // Exit with success status code (0)
});
