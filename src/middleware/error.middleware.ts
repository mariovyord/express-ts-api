import { Request, Response, NextFunction } from "express";
import mapErrors from "../utils/map-errors";

// eslint-disable-next-line no-unused-vars
const errorMiddleware =
  () => (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error: ${err.message}`);

    res.status(500).json({
      code: 500,
      message: "Something went wrong",
      data: undefined,
      errors: mapErrors(err.message),
    });
  };

export default errorMiddleware;
