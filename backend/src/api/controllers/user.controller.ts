import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user.service';
import { NotFoundError, ValidationError } from '../../core/errors/base-error';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = req.params.page;
    const users = await userService.fetchUsers(page);
    console.log(users);
    if (!users) {
      throw new NotFoundError('Users not found');
    }
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await userService.fetchUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, job } = req.body;
    if (!name || !job) {
      throw new ValidationError('Name and Job are required');
    }
    const newUser = await userService.createUser(name, job);
    res.status(201).json({ newUser });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, job } = req.body;
    if (!name || !job) {
      throw new ValidationError('Name and Job are required');
    }
    const updatedUser = await userService.updateUser(id, name, job);
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    res.status(200).json({ updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      throw new NotFoundError('User not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
