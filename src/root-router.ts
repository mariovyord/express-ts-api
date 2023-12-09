import express, { Request, Response, NextFunction } from "express";
import user from "./features/user/user-router";
import article from "./features/article/article-router";
import { HttpStatusCode } from "./utils/http-status-code";
import { AppError } from "./utils/app-error";

const router = express.Router();

router.use("/api/user", user);
router.use("/api/articles", article);

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(HttpStatusCode.NOT_FOUND, "Not found"));
});

export default router;
