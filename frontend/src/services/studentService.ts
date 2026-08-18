import apiFetch from './api';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type StudentPayload = Omit<Student, 'id'>;

export const studentService = {
  getAll: () => apiFetch<Student[]>('/students', { auth: true }),

  getById: (id: string) => apiFetch<Student>(`/students/${id}`, { auth: true }),

  create: (payload: StudentPayload) =>
    apiFetch<Student>('/students', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: Partial<StudentPayload>) =>
    apiFetch<Student>(`/students/${id}`, {
      method: 'PATCH',
      auth: true,
      body: JSON.stringify(payload),
    }),

  remove: (id: string) =>
    apiFetch<void>(`/students/${id}`, {
      method: 'DELETE',
      auth: true,
    }),
};