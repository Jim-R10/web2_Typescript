import { Student } from '../Model/student.js';
import * as studentRepository from '../Repository/studentRepository.js';

export async function getAllStudents(): Promise<Student[]> {
  return await studentRepository.findAllStudents();
}

export const getStudentById = async (id: string): Promise<Student> => {
  const student = await studentRepository.findStudentById(id);

  if (!student) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }

  return student;
};

export const createStudent = async (firstName: string, lastName: string, email: string): Promise<Student> => {
  if (!firstName || !lastName || !email) {
    const error: any = new Error('The fields firstName, lastName and email are required');
    error.status = 400;
    throw error;
  }

  return await studentRepository.createStudent(firstName, lastName, email);
};

export const replaceStudent = async (id: string, firstName: string, lastName: string, email: string): Promise<Student> => {
  if (!firstName || !lastName || !email) {
    const error: any = new Error('PUT requires all the fields : firstName, lastName, email');
    error.status = 400;
    throw error;
  }

  const updatedStudent = await studentRepository.updateStudent(id, firstName, lastName, email);

  if (!updatedStudent) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }

  return updatedStudent;
};

export const patchStudent = async (
  id: string,
  firstName?: string,
  lastName?: string,
  email?: string
): Promise<Student> => {
  const existingStudent = await studentRepository.findStudentById(id);

  if (!existingStudent) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }

  // Utilisation de l'opérateur ?? pour simplifier la fusion des champs
  const newFirstName = firstName ?? existingStudent.firstName;
  const newLastName = lastName ?? existingStudent.lastName;
  const newEmail = email ?? existingStudent.email;

  const updatedStudent = await studentRepository.updateStudent(id, newFirstName, newLastName, newEmail);

  if (!updatedStudent) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }

  return updatedStudent;
};

export const deleteStudent = async (id: string): Promise<void> => {
  const wasDeleted = await studentRepository.deleteStudent(id);

  if (!wasDeleted) {
    const error: any = new Error('Student not found');
    error.status = 404;
    throw error;
  }
};

export const studentService = {
  getAll: getAllStudents,
  getById: getStudentById,
  create: createStudent,
  replace: replaceStudent,
  update: patchStudent,
  remove: deleteStudent
};