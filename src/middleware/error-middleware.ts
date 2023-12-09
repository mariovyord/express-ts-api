import { Request, Response, NextFunction } from "express";
import mapErrors from "../utils/map-errors";
import { HttpStatusCode } from "../utils/http-status-code";
import { AppError } from "../utils/app-error";

// eslint-disable-next-line no-unused-vars
const errorMiddleware =
  () => (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const {
      statusCode = HttpStatusCode.InternalServerError,
      message = "Something went wrong",
    } = err;

    console.error(`Code: ${statusCode}; Error: ${message}`);

    res.status(statusCode).json({
      code: statusCode,
      message: "Something went wrong",
      data: null,
      errors: message,
    });
  };

export default errorMiddleware;
