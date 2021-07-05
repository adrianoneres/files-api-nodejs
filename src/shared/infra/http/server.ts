import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/containers';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from '@shared/infra/http/routes';
import '@shared/infra/database/typeorm';
import { AppError } from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

const host = process.env.APP_HOST || 'localhost';
const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3333;

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}!`);
});
