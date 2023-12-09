import mapErrors from "../utils/map-errors";
import JsonResponse from "../utils/json-response";
import * as articleService from "../services/article.service";
import { Request, Response } from "express";

export const getAll = () => async (req: Request, res: Response) => {
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
      errors: null,
    });

    return res.json(body);
  } catch (err) {
    const body = new JsonResponse({
      code: 404,
      message: "Articles not found",
      data: null,
      errors: mapErrors(err),
    });

    return res.status(404).json(body);
  }
};

export const getOne = () => async (req: Request, res: Response) => {
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
      errors: null,
    });

    return res.json(body);
  } catch (err) {
    const body = new JsonResponse({
      code: 404,
      message: "Article not found",
      data: null,
      errors: mapErrors(err),
    });

    return res.status(404).json(body);
  }
};

export const create = () => async (req: Request, res: Response) => {
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
      errors: null,
    });

    return res.status(201).json(body);
  } catch (err) {
    return res.status(424).json(
      new JsonResponse({
        code: 424,
        message: `Failed to create article`,
        data: null,
        errors: mapErrors(err),
      })
    );
  }
};

export const patch = () => async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = res.locals.user.id;
    const result = await articleService.update(id, userId, req.body);
    const body = new JsonResponse({
      code: 200,
      message: `Updated item in articles collection`,
      data: result,
      errors: null,
    });

    return res.json(body);
  } catch (err) {
    return res.status(424).json(
      new JsonResponse({
        code: 424,
        message: `Failed to update article`,
        data: null,
        errors: mapErrors(err),
      })
    );
  }
};

export const remove = () => async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = res.locals.user.id;

    await articleService.remove(id, userId);

    const body = new JsonResponse({
      code: 202,
      message: `Deleted item in articles`,
      data: null,
      errors: null,
    });

    return res.status(202).json(body);
  } catch (err) {
    return res.status(404).json(
      new JsonResponse({
        code: 404,
        message: `Failed to delete article`,
        data: null,
        errors: mapErrors(err),
      })
    );
  }
};
