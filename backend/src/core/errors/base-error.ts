export class BaseError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(400, message);
  }
}
