import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { corsOptions } from './core/config/config';
import { errorHandler } from './api/middlewares/error';
import { userRouter } from './api/routes/user/router';
dotenv.config();

async function startService() {
  const app = express();

  app.use(express.json());

  app.use(cors(corsOptions));

  app.use('/', userRouter);

  // Add the error handler as the last middleware
  app.use(errorHandler);
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startService();
