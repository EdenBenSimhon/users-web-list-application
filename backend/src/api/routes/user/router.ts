import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/getUsers/:page', getUsers);

userRouter.get('/getUser/:id', getUserById);
userRouter.post('/createUser', createUser);
userRouter.put('/updateUser/:id', updateUser);
userRouter.delete('/deleteUser/:id', deleteUser);
