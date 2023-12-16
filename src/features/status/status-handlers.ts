import { Request, Response } from "express";

export function statusPage(req: Request, res: Response) {
  res.render("status", { layout: "index", online: true });
}
