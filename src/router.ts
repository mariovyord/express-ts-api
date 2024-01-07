import express, { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "./utils/http-status-code";
import { IJsonResponse } from "./utils/json-response";
import userModule from "./features/user";
import articleModule from "./features/article";
import commentModule from "./features/comment";
import statusModule from "./features/status";
import { NotFoundError } from "./utils/app-error";

const router = express.Router();

function getApiSubRoute(version: "v1" | "v2", subroute: string): string {
  return `/api/${version}/${subroute}`;
}

function ping(req: Request, res: Response<IJsonResponse>) {
  res.json({
    code: 200,
    message: "API is operational",
    data: null,
  });
}

/**
 * API
 */
router.get("/api/ping", ping);
router.use(getApiSubRoute("v1", "user"), userModule);
router.use(getApiSubRoute("v1", "articles"), articleModule);
router.use(getApiSubRoute("v1", "comments"), commentModule);
/**
 * Pages
 */
router.use("/status", statusModule);

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

export default router;
