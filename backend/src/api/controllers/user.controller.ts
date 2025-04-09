import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user'; // Import user model
import { ValidationError } from '../../core/errors/base-error';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    throw new ValidationError('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ username, password: hashedPassword });
  await user.save();

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
  res.status(201).json({ token });
  return;
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new ValidationError('Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ValidationError('Invalid username or password');
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
  return;
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully' });
  return;
};
