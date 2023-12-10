import jwt from "jsonwebtoken";
import JsonResponse from "../utils/json-response";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import { HttpStatusCode } from "../utils/http-status-code";
import config from "../config/config";

const authenticateTokenMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.jwt;

    if (!accessToken) {
      return next(new AppError(HttpStatusCode.UNAUTHORIZED, "Unauthorized"));
    }

    if (!config.JWT_SECRET) {
      return next(
        new AppError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "Something went wrong"
        )
      );
    }

    jwt.verify(
      accessToken,
      config.JWT_SECRET,
      (err: jwt.VerifyErrors | null, user: any) => {
        if (err) {
          return next(new AppError(HttpStatusCode.FORBIDDEN, "Forbidden"));
        }

        res.locals.user = user;
        next();
      }
    );
  };

export default authenticateTokenMiddleware;
