import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../Service/AuthService.js';

export interface RequeteAvecUtilisateur extends Request {
  userId?: string;
  userRole?: 'student' | 'teacher';
}

export const verifierToken = (req: RequeteAvecUtilisateur, res: Response, next: NextFunction) => {
  const headerAutorisation = req.headers.authorization;

  if (!headerAutorisation) {
    const erreur: any = new Error('Token manquant, connexion requise');
    erreur.status = 401;
    return next(erreur);
  }

  const morceaux = headerAutorisation.split(' ');
  const token = morceaux[1];

  if (!token) {
    const erreur: any = new Error('Format du token invalide (Format attendu: Bearer <token>)');
    erreur.status = 401;
    return next(erreur);
  }

  try {
    const donneesDecodees: any = jwt.verify(token, AuthService.SECRET_KEY);
    req.userId = donneesDecodees.userId;
    req.userRole = donneesDecodees.role;
    next();
  } catch (erreurJwt) {
    const erreur: any = new Error('Token invalide ou expiré');
    erreur.status = 401;
    next(erreur);
  }
};

export const exigerRole = (rolesAutorises: Array<'student' | 'teacher'>) => {
  return (req: RequeteAvecUtilisateur, res: Response, next: NextFunction) => {
    if (!req.userRole || !rolesAutorises.includes(req.userRole)) {
      const erreur: any = new Error("Accès refusé: privilèges insuffisants");
      erreur.status = 403;
      return next(erreur);
    }
    next();
  };
};