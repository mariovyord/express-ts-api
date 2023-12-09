import app from "./app";
import db from "./database/db-connect";

const port = process.env.PORT || 5000;
const dbConnectionString =
  process.env.CONNECTION_STRING || "mongodb://localhost:27017/express-template";

(async function () {
  await db(dbConnectionString);

  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
})();
