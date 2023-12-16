import { engine } from "express-handlebars";
import { Express } from "express";
import path from "path";

export default function handlebarsConfig(app: Express) {
  app.engine(
    "handlebars",
    engine({
      extname: "handlebars",
    })
  );
  app.set("view engine", "handlebars");
  app.set("views", path.join(__dirname, "../views"));
}
