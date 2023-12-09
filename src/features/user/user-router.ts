import express from "express";
import * as userHandlers from "./user-handlers";
import authenticateToken from "../../middleware/auth-middleware";
import { validateBody } from "../../middleware/validator-middleware";
import { userSignInSchema, userSignUpSchema } from "./user-validators";

const router = express.Router();

router.all("/", (req, res) => {
  res.json({
    message: "User service",
  });
});

router.post("/signup", validateBody(userSignUpSchema), userHandlers.signUp());
router.post("/signin", validateBody(userSignInSchema), userHandlers.signIn());
router.delete("/signout", authenticateToken(), userHandlers.signOut());

export default router;
