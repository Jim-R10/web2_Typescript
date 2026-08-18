import { Router, Request, Response, NextFunction } from 'express';
import { studentService } from '../Service/studentService.js';
import { verifierToken } from '../middleWares/AuthMiddleware.js';

const getAll = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await studentService.getAll();
    res.status(200).json(students);
  } catch (erreur) {
    next(erreur);
  }
}

const getById = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await studentService.getById(req.params.id as string);
    res.status(200).json(student);
  } catch (erreur) {
    next(erreur);
  }
}

const create = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const newStudent = await studentService.create(firstName, lastName, email);
    res.status(201).json(newStudent);
  } catch (erreur) {
    next(erreur);
  }
}

const replace = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const updatedStudent = await studentService.replace(req.params.id as string , firstName, lastName, email);
    res.status(200).json(updatedStudent);
  } catch (erreur) {
    next(erreur);
  }
}

const update = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const updatedStudent = await studentService.update(req.params.id as string, firstName, lastName, email);
    res.status(200).json(updatedStudent);
  } catch (erreur) {
    next(erreur);
  }
}

const remove = async(req: Request, res: Response, next: NextFunction) => {
  try {
    await studentService.remove(req.params.id as string);
    res.status(204).send();
  } catch (erreur) {
    next(erreur);
  }
}

const router = Router();

router.get('/', verifierToken, getAll);
router.get('/:id', verifierToken, getById);
router.post('/', verifierToken, create);
router.put('/:id', verifierToken, replace);
router.patch('/:id', verifierToken, update);
router.delete('/:id', verifierToken, remove);

export default router;