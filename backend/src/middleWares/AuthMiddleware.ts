import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../Service/AuthService.js';

export interface RequeteAvecUtilisateur extends Request {
  userId?: string;
  userRole?: 'student' | 'teacher';
}

export const verifyToken = (req: RequeteAvecUtilisateur, res: Response, next: NextFunction) => {
  const headerAutorisation = req.headers.authorization;

  if (!headerAutorisation) {
    const error: any = new Error('Token missing, connexion required');
    error.status = 401;
    return next(error);
  }

  const peaces = headerAutorisation.split(' ');
  const token = peaces[1];

  if (!token) {
    const error: any = new Error('Invalid token format (Format: Bearer <token>)');
    error.status = 401;
    return next(error);
  }

  try {
    const codeofdata: any = jwt.verify(token, AuthService.SECRET_KEY);
    req.userId = codeofdata.userId;
    req.userRole = codeofdata.role;
    next();
  } catch (erreurJwt) {
    const error: any = new Error('Invalid or expired token');
    error.status = 401;
    next(error);
  }
};

export const requireRole = (rolesAutorises: Array<'student' | 'teacher'>) => {
  return (req: RequeteAvecUtilisateur, res: Response, next: NextFunction) => {
    if (!req.userRole || !rolesAutorises.includes(req.userRole)) {
      const error: any = new Error("Access denied: insufficient privileges");
      error.status = 403;
      return next(error);
    }
    next();
  };
};