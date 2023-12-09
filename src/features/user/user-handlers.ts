import mapErrors from "../../utils/map-errors";
import JsonResponse from "../../utils/json-response";
import authService from "./user-service";
import PublicUser from "../../utils/public-user";
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
      const result = await authService.signUp(userData);

      const body = new JsonResponse({
        code: 201,
        message: "Sign up successful",
        data: new PublicUser(result.user),
      });

      return res
        .cookie(authCookieName, result.token, authCookieOptions)
        .status(201)
        .json(body);
    } catch (err) {
      next(new AppError(HttpStatusCode.BadRequest, "Sign up failed"));
    }
  };

export const signIn =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const result = await authService.signIn(
        userData.username,
        userData.password
      );

      const body = new JsonResponse({
        code: 200,
        message: "Sign in successful",
        data: new PublicUser(result.user),
      });
      return res
        .cookie(authCookieName, result.token, authCookieOptions)
        .json(body);
    } catch (err) {
      next(new AppError(HttpStatusCode.Unauthorized, "Sign in failed"));
    }
  };

export const signOut = () => async (req: Request, res: Response) => {
  const body = new JsonResponse({
    code: 200,
    message: "Sign out successful",
    data: null,
  });

  return res.clearCookie(authCookieName).json(body);
};
