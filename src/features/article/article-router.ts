import express from "express";
import * as articleController from "./article-handlers";
import authenticateToken from "../../middleware/auth-middleware";
import { validateBody } from "../../middleware/validator-middleware";
import { articleCreateSchema, articlePatchSchema } from "./article-validators";

const router = express.Router();

router.get("/", articleController.getAllArticles());
router.post("/", authenticateToken(), validateBody(articleCreateSchema), articleController.createArticle());
router.get("/:id", articleController.getOneArticle());
router.patch("/:id", validateBody(articlePatchSchema), authenticateToken(), articleController.updateArticle());
router.delete("/:id", authenticateToken(), articleController.deleteArticle());

export default router;
