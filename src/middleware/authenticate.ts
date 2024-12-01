// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { configKeys } from '../config/keys';

const secretKey = configKeys.SECRET_KEY

export type User = {}

export interface LanguageRequest extends Request {
  user: User
}

export const authenticate : any = (req: LanguageRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  //console.log('token', token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
   // console.log('user', user);
    req.user = {user};
    next();
  });
};
