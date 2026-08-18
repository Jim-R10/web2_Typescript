import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../Repository/UserRepository.js';
import { RegisterInput, LoginInput } from '../Model/User';


const SECRET_KEY: string = process.env.JWT_SECRET || 'vomangabe_secret_key';

function creerErreur(message: string, status: number): any {
  const erreur: any = new Error(message);
  erreur.status = status;
  return erreur;
}


const register = async(input: RegisterInput) => {
  if (!input.email || !input.password) {
    throw creerErreur('Email et mot de passe requis', 400);
  }

  const utilisateurExistant = UserRepository.findByEmail(input.email);

  if (utilisateurExistant !== undefined) {
    throw creerErreur('Cet email est déjà utilisé', 400);
  }


  const passwordHash = await bcrypt.hash(input.password, 10);

  const nouvelUtilisateur = UserRepository.create(input.email, passwordHash);

  return {
    id: nouvelUtilisateur.id,
    email: nouvelUtilisateur.email
  };
}


const login = async(input: LoginInput) => {
  const utilisateur = UserRepository.findByEmail(input.email);

  if (utilisateur === undefined) {
    throw creerErreur('Email ou mot de passe incorrect', 401);
  }

  const motDePasseValide = await bcrypt.compare(input.password, utilisateur.passwordHash);

  if (motDePasseValide === false) {
    throw creerErreur('Email ou mot de passe incorrect', 401);
  }

  const token = jwt.sign(
    { userId: utilisateur.id, email: utilisateur.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  return { token: token };
}

export const AuthService = {
  register: register,
  login: login,
  SECRET_KEY: SECRET_KEY
};