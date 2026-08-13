import express from 'express';
import studentController from './Controller/studentController';
import { errorHandler } from './middleWares/errorHandlers';

const app = express();

app.use(express.json());

app.use('/students', studentController);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, function () {
  console.log('Server started on http://localhost:' + PORT);
});
