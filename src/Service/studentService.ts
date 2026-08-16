import { Student } from '../Model/student.js';
import * as studentRepository from '../Repository/studentRepository.js';

export async function getAllStudents(): Promise<Student[]> {
  const students = await studentRepository.findAllStudents();
  return students;
}

export async function getStudentById(id: string): Promise<Student> {
  const student = await studentRepository.findStudentById(id);

  if (student === undefined) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }

  return student;
}

export async function createStudent(firstName: string, lastName: string, email: string): Promise<Student> {
  if (firstName === undefined || lastName === undefined || email === undefined) {
    const error: any = new Error('The fields firstName, lastName and email are required');
    error.status = 400;
    throw error;
  }

  const newStudent = await studentRepository.createStudent(firstName, lastName, email);

  return newStudent;
}

export async function replaceStudent(id: string, firstName: string, lastName: string, email: string): Promise<Student> {
  if (firstName === undefined || lastName === undefined || email === undefined) {
    const error: any = new Error('PUT requires all the fields : firstName, lastName, email');
    error.status = 400;
    throw error;
  }

  const updatedStudent = await studentRepository.updateStudent(id, firstName, lastName, email);

  if (updatedStudent === undefined) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }

  return updatedStudent;
}

export async function patchStudent(id: string, firstName: string | undefined, lastName: string | undefined, email: string | undefined): Promise<Student> {
  const existingStudent = await studentRepository.findStudentById(id);

  if (existingStudent === undefined) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }

  let newFirstName = existingStudent.firstName;
  let newLastName = existingStudent.lastName;
  let newEmail = existingStudent.email;

  if (firstName !== undefined) {
    newFirstName = firstName;
  }
  if (lastName !== undefined) {
    newLastName = lastName;
  }
  if (email !== undefined) {
    newEmail = email;
  }

  const updatedStudent = await studentRepository.updateStudent(id, newFirstName, newLastName, newEmail);

  if (updatedStudent === undefined) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }

  return updatedStudent;
}

export async function deleteStudent(id: string): Promise<void> {
  const wasDeleted = await studentRepository.deleteStudent(id);

  if (wasDeleted === false) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }
}

export const studentService = {
  getAll: getAllStudents,
  getById: getStudentById,
  create: createStudent,
  replace: replaceStudent,
  update: patchStudent,
  remove: deleteStudent
};