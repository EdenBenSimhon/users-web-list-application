import { Router } from 'express';

import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../../controllers/api-user.controller';

export const apiUserRouter = Router();
apiUserRouter.use(authMiddleware);

apiUserRouter.get('/getUsers/:page', getUsers);
apiUserRouter.get('getUser/:id', getUserById);
apiUserRouter.post('createUser', createUser);
apiUserRouter.put('updateUser/:id', updateUser);
apiUserRouter.delete('deleteUser/:id', deleteUser);
