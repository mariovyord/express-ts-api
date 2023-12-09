import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./root-router";
import path from "path";
import handleErrors from "./middleware/error.middleware";
import loggerMiddleware from "./middleware/logger.middleware";

/**
 * The ExpressJS app
 */
const app = express();

/**
 * Load enviroment variables
 */
dotenv.config();

/**
 * Middlewares
 */
app.enable("trust proxy");

app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN?.split(",").map((x) => x.trim()),
    methods: process.env.ALLOW_METHODS?.split(",").map((x) => x.trim()),
    allowedHeaders: process.env.ALLOW_HEADERS?.split(",").map((x) => x.trim()),
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
app.use(router);
app.use(loggerMiddleware());
app.use(handleErrors());

export default app;
