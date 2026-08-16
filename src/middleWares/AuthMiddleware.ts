import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../Service/AuthService';

export interface RequeteAvecUtilisateur extends Request {
  userId?: string;
}

export function verifierToken(req: RequeteAvecUtilisateur, res: Response, next: NextFunction) {
  const headerAutorisation = req.headers.authorization;

  if (headerAutorisation === undefined) {
    const erreur: any = new Error('Token manquant, connexion requise');
    erreur.status = 401;
    return next(erreur);
  }

  const morceaux = headerAutorisation.split(' ');
  const token = morceaux[1];

  if (token === undefined) {
    const erreur: any = new Error('Format du token invalide');
    erreur.status = 401;
    return next(erreur);
  }

  try {
    const donneesDecodees: any = jwt.verify(token, AuthService.SECRET_KEY);
    req.userId = donneesDecodees.userId;
    next();
  } catch (erreurJwt) {
    const erreur: any = new Error('Token invalide ou expiré');
    erreur.status = 401;
    next(erreur);
  }
}