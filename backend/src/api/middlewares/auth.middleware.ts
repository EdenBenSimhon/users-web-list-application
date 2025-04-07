import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../core/errors/base-error';

export const authMiddleware = (
  req: Request & { user?: { userId: string } },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Unauthorized: No token provided');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    throw new UnauthorizedError('Unauthorized: Invalid token');
  }
};
