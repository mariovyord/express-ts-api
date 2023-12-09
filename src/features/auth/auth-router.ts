import express from "express";
import * as authContoller from "./auth-handlers";
import authenticateToken from "../../middleware/auth.middleware";

const router = express.Router();

router.all("/", (req, res) => {
  res.json({
    message: "Auth service",
  });
});

router.post("/signup", authContoller.signUp());
router.post("/signin", authContoller.signIn());
router.delete("/signout", authenticateToken(), authContoller.signOut());

export default router;
