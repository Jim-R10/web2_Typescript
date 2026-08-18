import { randomUUID } from 'crypto';
import { User } from '../Model/User.js';

let users: User[] = [];

const findByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

const create = (email: string, passwordHash: string, role: 'student' | 'teacher' = 'student'): User => {
  const newUser: User = {
    id: randomUUID(),
    email: email,
    passwordHash: passwordHash,
    role: role
  };

  users.push(newUser);
  return newUser;
};

export const UserRepository = {
  findByEmail,
  create
};