import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../Service/AuthService';

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const resultat = await AuthService.register(req.body);
    res.status(201).json(resultat);
  } catch (erreur) {
    next(erreur);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const resultat = await AuthService.login(req.body);
    res.status(200).json(resultat);
  } catch (erreur) {
    next(erreur);
  }
}

export const AuthController = {
  register: register,
  login: login
};

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;