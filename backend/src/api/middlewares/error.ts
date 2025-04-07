import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../../core/errors/base-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({ message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Something went wrong' });
};
