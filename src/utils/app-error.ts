import { HttpStatusCode } from "./http-status-code";

export class AppError extends Error {
  statusCode: HttpStatusCode;

  constructor(statusCode: HttpStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
