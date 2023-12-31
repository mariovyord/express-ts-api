import { IJsonResponse } from "../../utils/json-response";
import * as articleService from "./article-service";
import { NextFunction, Request, Response } from "express";
import { InternalServerError, NotFoundError } from "../../utils/app-error";
import { HttpStatusCode } from "../../utils/http-status-code";
import { IFullQuery } from "../../utils/build-query";

export function getAllArticles() {
  return async (req: Request<{}, {}, {}, IFullQuery>, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const query = req.query;
      const result = await articleService.getAll(query);

      return res.json({
        code: HttpStatusCode.OK,
        message: "Articles",
        data: result,
      });
    } catch (err) {
      next(new InternalServerError(err));
    }
  };
}

export function getOneArticle() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const id = req.params.id;
      const query = req.query;

      const result = await articleService.getOne(id, query);

      if (!result) {
        throw new NotFoundError();
      }

      return res.json({
        code: HttpStatusCode.OK,
        message: "Details",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}

export function createArticle() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const data = req.body;
      const userId = res.locals.user.id;
      const result = await articleService.create({
        owner: userId,
        ...data,
      });

      return res.status(HttpStatusCode.CREATED).json({
        code: HttpStatusCode.CREATED,
        message: "Created item in articles collection",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}

export function updateArticle() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id;
      const result = await articleService.update(id, userId, req.body);

      return res.json({
        code: HttpStatusCode.OK,
        message: "Updated item in articles collection",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}

export function deleteArticle() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id;

      await articleService.remove(id, userId);

      return res.status(HttpStatusCode.NO_CONTENT).json({
        code: HttpStatusCode.NO_CONTENT,
        message: "Deleted item in articles",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };
}
