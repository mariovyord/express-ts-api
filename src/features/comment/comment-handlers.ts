import { IJsonResponse } from "../../utils/json-response";
import * as commentService from "./comment-service";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { HttpStatusCode } from "../../utils/http-status-code";
import { GetAllCommentsQuery } from "./comment-types";

export function getAllComments() {
  return async (req: Request<{}, {}, {}, GetAllCommentsQuery>, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const query = req.query;
      const result = await commentService.getAllComments(query);

      return res.json({
        code: HttpStatusCode.OK,
        message: "Comments",
        data: result,
      });
    } catch (err) {
      next(new AppError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Something went wrong"));
    }
  };
}

export function getOneComment() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const id = req.params.id;
      const query = req.query;

      const result = await commentService.getOneComment(id, query);

      if (!result) {
        throw new Error("Not found");
      }

      return res.json({
        code: HttpStatusCode.OK,
        message: "Details",
        data: result,
      });
    } catch (err) {
      next(new AppError(HttpStatusCode.NOT_FOUND, "Not found"));
    }
  };
}

export function createComment() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const data = req.body;
      const userId = res.locals.user.id;
      const result = await commentService.createComment({
        ...data,
        owner: userId,
      });

      return res.status(HttpStatusCode.CREATED).json({
        code: HttpStatusCode.CREATED,
        message: "Created item in comments collection",
        data: result,
      });
    } catch (err) {
      next(new AppError(HttpStatusCode.BAD_REQUEST, "Failed to create comment"));
    }
  };
}

export function updateComment() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id;
      const result = await commentService.updateComment(id, userId, req.body);

      return res.json({
        code: HttpStatusCode.OK,
        message: "Updated item in comments collection",
        data: result,
      });
    } catch (err) {
      next(new AppError(HttpStatusCode.BAD_REQUEST, "Failed to update comment"));
    }
  };
}

export function deleteComment() {
  return async (req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userId = res.locals.user.id;

      await commentService.deleteComment(id, userId);

      return res.status(HttpStatusCode.NO_CONTENT).json({
        code: HttpStatusCode.NO_CONTENT,
        message: "Deleted item in comments",
        data: null,
      });
    } catch (err) {
      next(new AppError(HttpStatusCode.BAD_REQUEST, "Failed to delete comment"));
    }
  };
}
