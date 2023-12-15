import express, { Request, Response } from "express";
import * as userHandlers from "./user-handlers";
import authenticateToken from "../../middleware/auth-middleware";
import { validateBody } from "../../middleware/validator-middleware";
import { userPasswordSchema, userSignInSchema, userSignUpSchema, userUpdateSchema } from "./user-validators";
import { IJsonResponse } from "../../utils/json-response";
import { HttpStatusCode } from "../../utils/http-status-code";

const router = express.Router();

router.all("/", (req: Request, res: Response<IJsonResponse>) => {
  res.json({
    code: HttpStatusCode.OK,
    message: "User service",
    data: null,
  });
});

router.post("/signup", validateBody(userSignUpSchema), userHandlers.signUp());
router.post("/signin", validateBody(userSignInSchema), userHandlers.signIn());
router.delete("/signout", authenticateToken(), userHandlers.signOut());
router.get("/:id", authenticateToken(), userHandlers.getUserData());
router.patch("/:id", authenticateToken(), validateBody(userUpdateSchema), userHandlers.updateUser());
router.patch("/:id/password", authenticateToken(), validateBody(userPasswordSchema), userHandlers.updatePassword());

export default router;
