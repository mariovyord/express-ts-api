import JsonResponse from "../../utils/json-response";
import * as articleService from "./article-service";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { HttpStatusCode } from "../../utils/http-status-code";
import { GetAllArticlesQuery } from "./article-types";

export function getAll() {
  return async (
    req: Request<{}, {}, {}, GetAllArticlesQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = req.query;
      const result = await articleService.getAll(query);

      return res.json(
        new JsonResponse({
          code: HttpStatusCode.OK,
          message: "Articles",
          data: result,
        })
      );
    } catch (err) {
      next(new AppError(HttpStatusCode.NOT_FOUND, "Articles not found"));
    }
  };
}

export function getOne() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const query = req.query;
      const result = await articleService.getOne(id, query);

      if (!result) {
        throw new Error("Article not found");
      }

      return res.json(
        new JsonResponse({
          code: HttpStatusCode.OK,
          message: "Details of article",
          data: result,
        })
      );
    } catch (err) {
      next(new AppError(HttpStatusCode.NOT_FOUND, "Article not found"));
    }
  };
}

export function create() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const userId = res.locals.user.id;
      const result = await articleService.create({
        owner: userId,
        ...data,
      });

      return res.status(HttpStatusCode.CREATED).json(
        new JsonResponse({
          code: HttpStatusCode.CREATED,
          message: "Created item in articles collection",
          data: result,
        })
      );
    } catch (err) {
      next(
        new AppError(HttpStatusCode.BAD_REQUEST, "Failed to create article")
      );
    }
  };
}

export function patch() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id;
      const result = await articleService.update(id, userId, req.body);

      return res.json(
        new JsonResponse({
          code: HttpStatusCode.OK,
          message: "Updated item in articles collection",
          data: result,
        })
      );
    } catch (err) {
      next(
        new AppError(HttpStatusCode.BAD_REQUEST, "Failed to update article")
      );
    }
  };
}

export function remove() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id;

      await articleService.remove(id, userId);

      return res.status(HttpStatusCode.NO_CONTENT).json(
        new JsonResponse({
          code: HttpStatusCode.NO_CONTENT,
          message: "Deleted item in articles",
          data: null,
        })
      );
    } catch (err) {
      next(
        new AppError(HttpStatusCode.BAD_REQUEST, "Failed to delete article")
      );
    }
  };
}
