import express, { Request, Response, NextFunction } from "express";
import user from "./features/user/user-router";
import article from "./features/article/article-router";
import { HttpStatusCode } from "./utils/http-status-code";
import { AppError } from "./utils/app-error";

const router = express.Router();

function getSubRoute(version: "v1" | "v2", subroute: string): string {
  return `/api/${version}/${subroute}`;
}

router.use(getSubRoute("v1", "user"), user);
router.use(getSubRoute("v1", "article"), article);

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(HttpStatusCode.NOT_FOUND, "Not found"));
});

export default router;
