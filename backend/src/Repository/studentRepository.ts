import { pool } from '../db.js';
import { Student } from '../Model/student.js';
import { randomUUID } from 'crypto';

export const findAllStudents = async(): Promise<Student[]> => {
  const result = await pool.query('SELECT * FROM students');

  const students: Student[] = [];

  for (let i = 0; i < result.rows.length; i++) {
    const row = result.rows[i];

    const student: Student = {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email
    };

    students.push(student);
  }

  return students;
}

export const findStudentById = async(id: string): Promise<Student | undefined> => {
  const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    return undefined;
  }

  const row = result.rows[0];

  const student: Student = {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email
  };

  return student;
}

export const createStudent = async(firstName: string, lastName: string, email: string): Promise<Student> => {
  const id = randomUUID();
  
  const result = await pool.query(
    'INSERT INTO students (id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, firstName, lastName, email]
  );

  const row = result.rows[0];

  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email
  };
}

export const updateStudent = async(id: string, firstName: string, lastName: string, email: string): Promise<Student | undefined> => {
  const result = await pool.query(
    'UPDATE students SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *',
    [firstName, lastName, email, id]
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  const row = result.rows[0];

  const student: Student = {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email
  };

  return student;
}

export const deleteStudent = async(id: string): Promise<boolean> => {
  const result = await pool.query('DELETE FROM students WHERE id = $1', [id]);

  if (result.rowCount === 0) {
    return false;
  }

  return true;
}
