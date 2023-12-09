import jwt from "jsonwebtoken";
import JsonResponse from "../utils/json-response";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { HttpStatusCode } from "../utils/http-status-code";

const authenticateTokenMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.jwt;

    if (!accessToken) {
      next(new AppError(HttpStatusCode.UNAUTHORIZED, "Unauthorized"));
    }

    jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "",
      (err: jwt.VerifyErrors | null, user: any) => {
        if (err) {
          next(new AppError(HttpStatusCode.FORBIDDEN, "Forbidden"));
        } else {
          res.locals.user = user;
          next();
        }
      }
    );
  };

export default authenticateTokenMiddleware;
