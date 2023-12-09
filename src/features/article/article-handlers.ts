import mapErrors from "../../utils/map-errors";
import JsonResponse from "../../utils/json-response";
import * as articleService from "./article-service";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { HttpStatusCode } from "../../utils/http-status-code";

export const getAll =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const result = await articleService.getAll(query);

      if (!result) {
        throw new Error("Articles not found");
      }

      const body = new JsonResponse({
        code: 200,
        message: `List of Articles`,
        data: result,
      });

      return res.json(body);
    } catch (err) {
      next(new AppError(HttpStatusCode.NOT_FOUND, "Articles not found"));
    }
  };

export const getOne =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const query = req.query;
      const result = await articleService.getOne(id, query);

      if (!result) {
        throw new Error("Article not found");
      }

      const body = new JsonResponse({
        code: 200,
        message: `Details of article`,
        data: result,
      });

      return res.json(body);
    } catch (err) {
      next(new AppError(HttpStatusCode.NOT_FOUND, "Article not found"));
    }
  };

export const create =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const userId = res.locals.user.id;
      const result = await articleService.create({
        owner: userId,
        ...data,
      });
      const body = new JsonResponse({
        code: 201,
        message: `Created item in articles collection`,
        data: result,
      });

      return res.status(HttpStatusCode.CREATED).json(body);
    } catch (err) {
      next(
        new AppError(HttpStatusCode.BAD_REQUEST, "Failed to create article")
      );
    }
  };

export const patch =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id;
      const result = await articleService.update(id, userId, req.body);
      const body = new JsonResponse({
        code: 200,
        message: `Updated item in articles collection`,
        data: result,
      });

      return res.json(body);
    } catch (err) {
      next(
        new AppError(HttpStatusCode.BAD_REQUEST, "Failed to update article")
      );
    }
  };

export const remove =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id;

      await articleService.remove(id, userId);

      const body = new JsonResponse({
        code: 202,
        message: "Deleted item in articles",
        data: null,
      });

      return res.status(202).json(body);
    } catch (err) {
      next(
        new AppError(HttpStatusCode.BAD_REQUEST, "Failed to delete article")
      );
    }
  };
