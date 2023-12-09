import express from "express";
import * as articleController from "../../controllers/article.controller";
import authenticateToken from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", articleController.getAll());
router.post("/", authenticateToken(), articleController.create());
router.get("/:id", articleController.getOne());
router.patch("/:id", authenticateToken(), articleController.patch());
router.delete("/:id", authenticateToken(), articleController.remove());

export default router;
