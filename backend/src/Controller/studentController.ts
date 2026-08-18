import { Router, Request, Response, NextFunction } from 'express';
import { studentService } from '../Service/studentService.js';
import { verifyToken } from '../middleWares/AuthMiddleware.js';

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
  } catch (error) {
    next(error);
  }
}

const create = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const newStudent = await studentService.create(firstName, lastName, email);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
}

const replace = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const updatedStudent = await studentService.replace(req.params.id as string , firstName, lastName, email);
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
}

const update = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const updatedStudent = await studentService.update(req.params.id as string, firstName, lastName, email);
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
}

const remove = async(req: Request, res: Response, next: NextFunction) => {
  try {
    await studentService.remove(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

const router = Router();

router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getById);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, replace);
router.patch('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

export default router;