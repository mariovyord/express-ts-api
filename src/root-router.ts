import express, { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "./utils/http-status-code";
import { IJsonResponse } from "./utils/json-response";
import userRouter from "./features/user/user-router";
import articleRouter from "./features/article/article-router";
import commentRouter from "./features/comment/comment-router";
import statusRouter from "./features/status/status-router";
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
router.use(getApiSubRoute("v1", "user"), userRouter);
router.use(getApiSubRoute("v1", "articles"), articleRouter);
router.use(getApiSubRoute("v1", "comments"), commentRouter);
/**
 * Pages
 */
router.use("/status", statusRouter);

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

export default router;
