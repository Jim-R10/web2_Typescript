import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authController from './Controller/AuthController';
import studentController from './Controller/studentController';
import { errorHandler } from './middleWares/errorHandlers';

const app = express();

app.use(express.json());

app.use('/auth', authController);        
app.use('/students', studentController); 

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, function () {
  console.log('Serveur lancé sur http://localhost:' + PORT);
});