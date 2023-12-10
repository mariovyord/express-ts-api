import app from "./app";
import db from "./config/db";
import config from "./config/config";

const port = config.PORT || 5000;
const dbConnectionString =
  config.CONNECTION_STRING || "mongodb://localhost:27017/express-template";

(async function () {
  await db(dbConnectionString);

  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
})();
