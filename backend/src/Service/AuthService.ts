import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../Repository/UserRepository.js';
import { RegisterInput, LoginInput } from '../Model/User.js';

const SECRET_KEY: string = process.env.JWT_SECRET || 'vomangabe_secret_key';

const createError = (message: string, status: number): any => {
  const error: any = new Error(message);
  error.status = status;
  return error;
}

const register = async (input: RegisterInput) => {
  if (!input.email || !input.password) {
    throw createError('Email et mot de passe requis', 400);
  }

  const ExistantUser = UserRepository.findByEmail(input.email);
  if (ExistantUser !== undefined) {
    throw createError('Cet email est déjà utilisé', 400);
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const userRole = input.role || 'student';

  const newUser = UserRepository.create(input.email, passwordHash, userRole);

  return {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role
  };
};

const login = async (input: LoginInput) => {
  const user = UserRepository.findByEmail(input.email);

  if (user === undefined) {
    throw createError('Email ou mot de passe incorrect', 401);
  }

  const invalidPassword = await bcrypt.compare(input.password, user.passwordHash);
  if (!invalidPassword) {
    throw createError('Email ou mot de passe incorrect', 401);
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  return { token };
};

export const AuthService = {
  register,
  login,
  SECRET_KEY
};