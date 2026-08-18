import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../Repository/UserRepository.js';
import { RegisterInput, LoginInput } from '../Model/User.js';

const SECRET_KEY: string = process.env.JWT_SECRET || 'vomangabe_secret_key';

function creerErreur(message: string, status: number): any {
  const erreur: any = new Error(message);
  erreur.status = status;
  return erreur;
}

const register = async (input: RegisterInput) => {
  if (!input.email || !input.password) {
    throw creerErreur('Email et mot de passe requis', 400);
  }

  const utilisateurExistant = UserRepository.findByEmail(input.email);
  if (utilisateurExistant !== undefined) {
    throw creerErreur('Cet email est déjà utilisé', 400);
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const userRole = input.role || 'student';

  const nouvelUtilisateur = UserRepository.create(input.email, passwordHash, userRole);

  return {
    id: nouvelUtilisateur.id,
    email: nouvelUtilisateur.email,
    role: nouvelUtilisateur.role
  };
};

const login = async (input: LoginInput) => {
  const utilisateur = UserRepository.findByEmail(input.email);

  if (utilisateur === undefined) {
    throw creerErreur('Email ou mot de passe incorrect', 401);
  }

  const motDePasseValide = await bcrypt.compare(input.password, utilisateur.passwordHash);
  if (!motDePasseValide) {
    throw creerErreur('Email ou mot de passe incorrect', 401);
  }

  // Ajout du champ role dans le payload JWT
  const token = jwt.sign(
    { userId: utilisateur.id, email: utilisateur.email, role: utilisateur.role },
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