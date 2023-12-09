import { Request, Response, NextFunction } from "express";

import Joi from "joi";
import { HttpStatusCode } from "../utils/http-status-code";
import { AppError } from "../utils/app-error";

export const validateBody =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = Joi.compile(schema).validate(req.body);

    if (error) {
      console.log(error);
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");

      return next(new AppError(HttpStatusCode.BadRequest, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };
