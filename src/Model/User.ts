export interface User {
  id: string;
  email: string;
  passwordHash: string; 
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}