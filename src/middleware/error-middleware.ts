import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utils/http-status-code";
import { AppError } from "../utils/app-error";
import { IJsonResponse } from "../utils/json-response";

const errorMiddleware = () => (err: AppError, req: Request, res: Response<IJsonResponse>, next: NextFunction) => {
  const { statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR, message = "Something went wrong" } = err;

  console.error(`Code: ${statusCode}; Error: `, err);

  res.status(statusCode).json({
    code: statusCode,
    message: message,
    data: null,
  });
};

export default errorMiddleware;
