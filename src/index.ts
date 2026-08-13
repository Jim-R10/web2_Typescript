import express from 'express';
import etudiantsRouter from './routes/etudiants';
import { errorHandler } from './middleWares/errorHandlers';

const app = express();

app.use(express.json());

app.use('/etudiants', etudiantsRouter);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, function () {
  console.log('Serveur lancé sur http://localhost:' + PORT);
});