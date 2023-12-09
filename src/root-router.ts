import express from "express";
import user from "./features/user/user-router";
import article from "./features/article/article-router";
import JsonResponse from "./utils/json-response";

const router = express.Router();

router.use("/api/user", user);
router.use("/api/articles", article);

router.all("*", (req, res) => {
  const body = new JsonResponse({
    code: 404,
    message: "Path not found",
    data: undefined,
    errors: ["Path not found"],
  });

  res.status(404).json(body);
});

export default router;
