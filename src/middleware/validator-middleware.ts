import { Request, Response, NextFunction } from "express";

import Joi from "joi";
import { BadRequestError } from "../utils/app-error";

export const validateBody = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = Joi.compile(schema).validate(req.body);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(", ");

    return next(new BadRequestError(errorMessage));
  }

  return next();
};
