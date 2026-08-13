import { Router, Request, Response, NextFunction } from 'express';
import * as studentService from '../Service/studentService.js';

const router = Router();

router.get('/', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const student = await studentService.getStudentById(id);
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
});

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const newStudent = await studentService.createStudent(firstName, lastName, email);

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const updatedStudent = await studentService.replaceStudent(id, firstName, lastName, email);

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const updatedStudent = await studentService.patchStudent(id, firstName, lastName, email);

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    await studentService.deleteStudent(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
