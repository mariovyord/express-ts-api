import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./root-router";
import path from "path";
import handleErrors from "./middleware/error-middleware";
import loggerMiddleware from "./middleware/logger-middleware";
import getConfig from "./config/get-config";
import * as swaggerDoc from "../swagger.json";
import swagger from "swagger-ui-express";
import helmet from "helmet";

/**
 * The ExpressJS app
 */
const app = express();

/**
 * Middlewares
 */
app.enable("trust proxy");

const config = getConfig();

app.use(helmet());
app.use(
  cors({
    origin: config.ALLOW_ORIGIN?.split(",").map((x) => x.trim()),
    methods: config.ALLOW_METHODS?.split(",").map((x) => x.trim()),
    allowedHeaders: config.ALLOW_HEADERS?.split(",").map((x) => x.trim()),
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
/**
 * Routes and global error handling
 */
app.use(loggerMiddleware());
app.use("/docs", swagger.serve, swagger.setup(swaggerDoc));
app.use(router);
app.use(handleErrors());

export default app;
