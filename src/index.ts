import app from "./app";
import { AppDataSource } from "./config/db";
import getConfig from "./config/get-config";
import { AppError } from "./utils/app-error";

const config = getConfig();
const port: number = config.PORT ? parseInt(config.PORT) : 5000;

(async function () {
  AppDataSource.initialize()
    .then(async () => {
      app.listen(port, () => console.log(`⚡️ Server is listening on port ${port}...`));
    })
    .catch((err) => {
      console.error("Error connecting to database", err);
      process.exit(1);
    });
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
