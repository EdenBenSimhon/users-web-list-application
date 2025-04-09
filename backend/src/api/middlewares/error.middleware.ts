import { ErrorRequestHandler } from 'express';
import { BaseError } from '../../core/errors/base-error';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    const { statusCode, message } = err;
    res.status(statusCode).json({ message });
    return;
  }

  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
  return;
};
