import express from "express";
import * as statusHandlers from "./status-handlers";

const router = express.Router();

router.get("/", statusHandlers.statusPage);

export default router;
