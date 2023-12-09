import jwt from "jsonwebtoken";
import JsonResponse from "../utils/json-response";
import { Request, Response, NextFunction } from "express";

const authenticateTokenMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.jwt;

    if (!accessToken) {
      const body = new JsonResponse({
        code: 401,
        message: "Unauthorized",
        data: undefined,
        errors: ["Access Token needed to continue"],
      });

      return res.status(401).json(body);
    }

    jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "",
      (err: jwt.VerifyErrors | null, user: any) => {
        if (err) {
          const body = new JsonResponse({
            code: 403,
            message: "Forbidden",
            data: undefined,
            errors: ["Access Token not valid"],
          });

          return res.clearCookie("jwt").status(403).json(body);
        } else {
          res.locals.user = user;
          next();
        }
      }
    );
  };

export default authenticateTokenMiddleware;
