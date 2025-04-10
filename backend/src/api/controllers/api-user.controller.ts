import { NextFunction, Request, Response } from 'express';
import { apiService } from '../services/api.service';
import { NotFoundError, ValidationError } from '../../core/errors/base-error';
import { ApiUserModel } from '../models/api-user';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.params.page);
    const apiUsers = await ApiUserModel.find({ page: page }).select(
      'id first_name last_name email avatar page'
    );
    if (apiUsers.length > 0) {
      const mappedUsers = apiUsers.map((api) => ({
        id: api.id,
        email: api.email,
        first_name: api.first_name,
        last_name: api.last_name,
        avatar: api.avatar,
      }));
      res.status(200).json({ users: mappedUsers });
      return;
    }
    const users = await apiService.fetchUsers(page);
    if (!users?.length) {
      throw new NotFoundError('Users not found');
    }
    const insertUsers = users.map((user: any) => ({
      updateOne: {
        filter: { id: user.id },
        update: {
          $set: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            avatar: user.avatar,
            page: page,
          },
        },
        upsert: true,
      },
    }));
    await ApiUserModel.bulkWrite(insertUsers);
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
    const user = await ApiUserModel.findOne({ id: id });
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

    const newUser1 = new ApiUserModel({
      id: Math.floor(Math.random() * 1000) + '',
      first_name: name,
      last_name: name,
      email: 'created@movement.com',
      job: job,
      page: 1,
      avatar: 'local created',
    });
    await newUser1.save();
    const user = {
      id: newUser1.id,
      first_name: newUser1.first_name,
      last_name: newUser1.last_name,
      email: newUser1.email,
      avatar: newUser1.avatar,
    };
    await apiService.createUser(name, job);
    res.status(201).json(user);
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

    const updatedUser = await ApiUserModel.findOneAndUpdate(
      { id: id },
      { first_name: name, last_name: name, job },
      { new: true }
    );

    await apiService.updateUser(id, name, job);
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
    const deletedUser = await ApiUserModel.findOneAndDelete({ id: id });
    const deleted = await apiService.deleteUser(id);
    if (!deletedUser || !deleted) {
      throw new NotFoundError('User not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
