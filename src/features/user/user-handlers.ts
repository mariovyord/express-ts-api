import mapErrors from "../../utils/map-errors";
import JsonResponse from "../../utils/json-response";
import authService from "./user-service";
import PublicUser from "../../utils/public-user";
import { Request, Response } from "express";

const authCookieName = "jwt";
const authCookieOptions = {
  httpOnly: true,
  sameSite: false,
  expires: new Date(Date.now() + 31536000000), // 1 day life
  secure: true,
};

export const signUp = () => async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await authService.signUp(userData);

    const body = new JsonResponse({
      code: 201,
      message: "Sign up successful",
      data: new PublicUser(result.user),
      errors: null,
    });

    return res
      .cookie(authCookieName, result.token, authCookieOptions)
      .status(201)
      .json(body);
  } catch (err) {
    const body = new JsonResponse({
      code: 400,
      message: "Sign up failed",
      data: null,
      errors: mapErrors(err),
    });

    return res.status(400).json(body);
  }
};

export const signIn = () => async (req: Request, res: Response) => {
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
      errors: null,
    });
    return res
      .cookie(authCookieName, result.token, authCookieOptions)
      .json(body);
  } catch (err) {
    const body = new JsonResponse({
      code: 401,
      message: "Sign in failed",
      data: null,
      errors: mapErrors(err),
    });

    return res.status(401).json(body);
  }
};

export const signOut = () => async (req: Request, res: Response) => {
  const body = new JsonResponse({
    code: 200,
    message: "Sign out successful",
    data: null,
    errors: null,
  });

  return res.clearCookie(authCookieName).json(body);
};
