import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authController from './Controller/AuthController';
import studentController from './Controller/studentController';
import { errorHandler } from './middleWares/errorHandlers';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.use('/auth', authController);
app.use('/students', studentController);

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, function () {
  console.log('Serveur lancé sur http://localhost:' + PORT);
});