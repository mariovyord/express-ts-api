import { IJsonResponse } from "../../utils/json-response";
import authService from "./user-service";
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

export function signUp() {
  return async (
    req: Request,
    res: Response<IJsonResponse>,
    next: NextFunction
  ) => {
    try {
      const userData = req.body;
      const [token, user] = await authService.signUp(userData);

      return res
        .cookie(authCookieName, token, authCookieOptions)
        .status(HttpStatusCode.CREATED)
        .json({
          code: HttpStatusCode.CREATED,
          message: "Sign up successful",
          data: user,
        });
    } catch (err) {
      next(new AppError(HttpStatusCode.BAD_REQUEST, "Sign up failed"));
    }
  };
}

export function signIn() {
  return async (
    req: Request,
    res: Response<IJsonResponse>,
    next: NextFunction
  ) => {
    try {
      const userData = req.body;
      const [token, user] = await authService.signIn(
        userData.username,
        userData.password
      );

      return res.cookie(authCookieName, token, authCookieOptions).json({
        code: HttpStatusCode.OK,
        message: "Sign in successful",
        data: user,
      });
    } catch (err) {
      next(new AppError(HttpStatusCode.UNAUTHORIZED, "Sign in failed"));
    }
  };
}

export function signOut() {
  return async (req: Request, res: Response<IJsonResponse>) => {
    return res.clearCookie(authCookieName).json({
      code: HttpStatusCode.OK,
      message: "Sign out successful",
      data: null,
    });
  };
}
