import express from "express";
import * as commentController from "./comment-handlers";
import authenticateToken from "../../middleware/auth-middleware";
import { validateBody } from "../../middleware/validator-middleware";
import { commentCreateSchema, commentPatchSchema } from "./comment-validators";

const router = express.Router();

router.get("/", commentController.getAllComments());
router.post("/", authenticateToken(), validateBody(commentCreateSchema), commentController.createComment());
router.get("/:id", commentController.getOneComment());
router.patch("/:id", validateBody(commentPatchSchema), authenticateToken(), commentController.updateComment());
router.delete("/:id", authenticateToken(), commentController.deleteComment());

export default router;
