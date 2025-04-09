import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { corsOptions } from './core/config/config';
import { connectToDatabase } from './core/config/db';
import { apiUserRouter } from './api/routes/api-user/router';
import { userRouter } from './api/routes/user/router';
import { errorHandler } from './api/middlewares/error.middleware';
dotenv.config();

async function startService() {
  const app = express();

  app.use(express.json());

  app.use(cors(corsOptions));

  app.use('/user', userRouter);

  app.use('/api', apiUserRouter);

  app.use(errorHandler);
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startService();
connectToDatabase();
