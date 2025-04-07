import { Router } from 'express';
import { login, logout, register } from '../../controllers/user.controller';

export const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/logout', logout);
