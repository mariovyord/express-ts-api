import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { InternalServerError, UnauthorizedError } from "../utils/app-error";
import { getConfig } from "../config/get-config";
import { IUserLocal } from "../features/user/user-types";

const authenticateTokenMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.jwt;
  const config = getConfig();

  if (!accessToken) {
    return next(new UnauthorizedError());
  }

  if (!config.JWT_SECRET) {
    return next(new InternalServerError());
  }

  jwt.verify(accessToken, config.JWT_SECRET, (err: jwt.VerifyErrors | null, user: IUserLocal) => {
    if (err) {
      return next(new UnauthorizedError());
    }

    res.locals.user = user;
    return next();
  });
};

export default authenticateTokenMiddleware;
