import express from "express";
import * as userHandlers from "./user-handlers";
import authenticateToken from "../../middleware/auth-middleware";
import { validateBody } from "../../middleware/validator-middleware";
import { userSignInSchema, userSignUpSchema } from "./user-validators";
import JsonResponse from "../../utils/json-response";
import { HttpStatusCode } from "../../utils/http-status-code";

const router = express.Router();

router.all("/", (req, res) => {
  res.json(
    new JsonResponse({
      code: HttpStatusCode.OK,
      message: "User service",
      data: null,
    })
  );
});

router.post("/signup", validateBody(userSignUpSchema), userHandlers.signUp());
router.post("/signin", validateBody(userSignInSchema), userHandlers.signIn());
router.delete("/signout", authenticateToken(), userHandlers.signOut());

export default router;
