import { IJsonResponse } from "../../utils/json-response";
import * as userService from "./user-service";
import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../../utils/app-error";
import { HttpStatusCode } from "../../utils/http-status-code";
import { IUserLocal, UserDto } from "./user-types";

const authCookieName = "jwt";
const authCookieOptions = {
  httpOnly: true,
  sameSite: false,
  expires: new Date(Date.now() + 31536000000), // 1 day life
  secure: true,
};

export function signUp() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const userData = req.body;
      const [token, user] = await userService.signUp(userData);

      return res.cookie(authCookieName, token, authCookieOptions).status(HttpStatusCode.CREATED).json({
        code: HttpStatusCode.CREATED,
        message: "Sign up successful",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };
}

export function signIn() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const userData = req.body;
      const [token, user] = await userService.signIn(userData.username, userData.password);

      return res.cookie(authCookieName, token, authCookieOptions).json({
        code: HttpStatusCode.OK,
        message: "Sign in successful",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };
}

export function signOut() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      return res.clearCookie(authCookieName).json({
        code: HttpStatusCode.OK,
        message: "Sign out successful",
        data: null,
      });
    } catch (err) {
      return next(err);
    }
  };
}

export function getUserData() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const user = res.locals.user as IUserLocal;

      const userData = await userService.getUser(user);

      return res.json({
        code: HttpStatusCode.OK,
        message: "User fetched successfully",
        data: userData,
      });
    } catch (err) {
      return next(err);
    }
  };
}

export function updateUser() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const requestUserId = req.params?.id;
      const user = res.locals.user as IUserLocal;

      if (user.id !== requestUserId) {
        throw new UnauthorizedError();
      }

      const userData = req.body;
      const updatedUser = await userService.updateUser(user.id, userData);

      return res.json({
        code: HttpStatusCode.OK,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (err) {
      return next(err);
    }
  };
}

export function updatePassword() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const newPassword = req.body.newPassword;
      const oldPassword = req.body.oldPassword;
      const user = res.locals.user;
      const requestedUserId = req.params.id;

      if (user.id !== requestedUserId) {
        throw new UnauthorizedError();
      }

      const updatedUser = await userService.updatePassword(user.id, oldPassword, newPassword);

      return res.json({
        code: HttpStatusCode.OK,
        message: "Password updated successfully",
        data: updatedUser,
      });
    } catch (err) {
      return next(err);
    }
  };
}
