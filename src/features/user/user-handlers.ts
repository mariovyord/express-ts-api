import mapErrors from "../../utils/map-errors";
import JsonResponse from "../../utils/json-response";
import authService from "./user-service";
import { UserEntity } from "./user-types";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { HttpStatusCode } from "../../utils/http-status-code";

const authCookieName = "jwt";
const authCookieOptions = {
  httpOnly: true,
  sameSite: false,
  expires: new Date(Date.now() + 31536000000), // 1 day life
  secure: true,
};

export const signUp =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const [token, user] = await authService.signUp(userData);

      return res
        .cookie(authCookieName, token, authCookieOptions)
        .status(HttpStatusCode.CREATED)
        .json(
          new JsonResponse({
            code: HttpStatusCode.CREATED,
            message: "Sign up successful",
            data: user,
          })
        );
    } catch (err) {
      next(new AppError(HttpStatusCode.BAD_REQUEST, "Sign up failed"));
    }
  };

export const signIn =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const [token, user] = await authService.signIn(
        userData.username,
        userData.password
      );
      debugger;

      return res.cookie(authCookieName, token, authCookieOptions).json(
        new JsonResponse({
          code: HttpStatusCode.OK,
          message: "Sign in successful",
          data: user,
        })
      );
    } catch (err) {
      next(new AppError(HttpStatusCode.UNAUTHORIZED, "Sign in failed"));
    }
  };

export const signOut = () => async (req: Request, res: Response) => {
  return res.clearCookie(authCookieName).json(
    new JsonResponse({
      code: HttpStatusCode.OK,
      message: "Sign out successful",
      data: null,
    })
  );
};
