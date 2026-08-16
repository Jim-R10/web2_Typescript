import { randomUUID } from 'crypto';
import { User } from '../Model/User';

let users: User[] = [];

function findByEmail(email: string): User | undefined {
  let foundUser: User | undefined = undefined;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      foundUser = users[i];
    }
  }

  return foundUser;
}

function create(email: string, passwordHash: string): User {
  const newUser: User = {
    id: randomUUID(),
    email: email,
    passwordHash: passwordHash
  };

  users.push(newUser);

  return newUser;
}

export const UserRepository = {
  findByEmail: findByEmail,
  create: create
};