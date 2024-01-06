import { HttpStatusCode } from "./http-status-code";

export class AppError extends Error {
  statusCode: HttpStatusCode;
  /**
   * isOperational flag that is set to true by default.
   * It’s used to distinguish between known errors raised by us and other ones that we don’t know how to handle.
   */
  isOperational: boolean;

  constructor(statusCode: HttpStatusCode, message: string, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Not found") {
    super(HttpStatusCode.NOT_FOUND, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(HttpStatusCode.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(HttpStatusCode.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(HttpStatusCode.FORBIDDEN, message);
  }
}

export class MethodNotAllowedError extends AppError {
  constructor(message: string = "Method not allowed") {
    super(HttpStatusCode.METHOD_NOT_ALLOWED, message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict") {
    super(HttpStatusCode.CONFLICT, message);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR, message);
  }
}

export class NotImplementedError extends AppError {
  constructor(message: string = "Not implemented") {
    super(HttpStatusCode.NOT_IMPLEMENTED, message);
  }
}

export class BadGatewayError extends AppError {
  constructor(message: string = "Bad gateway") {
    super(HttpStatusCode.BAD_GATEWAY, message);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message: string = "Service unavailable") {
    super(HttpStatusCode.SERVICE_UNAVAILABLE, message);
  }
}
