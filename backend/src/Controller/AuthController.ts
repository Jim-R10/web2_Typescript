import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../Service/AuthService.js';

const register = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

const login = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
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