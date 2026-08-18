export interface User {
  id: string;
  email: string;
  passwordHash: string; 
  role: 'student' | 'teacher';
}

export interface RegisterInput {
  email: string;
  password: string;
  role?: 'student' | 'teacher';
}

export interface LoginInput {
  email: string;
  password: string;
}