import jwt, { SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@/utils/custom-error';
import { DecodedToken } from '@/interfaces/context.interfaces';
import {
    JWT_ACCESS_TOKEN_SECRET,
  } from "@/config";




export const generateJWT = (payload: object, secret: string, expiresIn: number | StringValue | undefined): {token: string,expires_in: number} => {
  const options: SignOptions = { expiresIn }
  const token = jwt.sign(payload, secret, options);
  let expires_in: number;
  if (typeof expiresIn === 'string') {
    const match = expiresIn.match(/(\d+)([smhd])/); 
    if (match) {
      const value = parseInt(match[1], 10);
      const unit = match[2];

      const now = Date.now();
      switch (unit) {
        case 's':
          expires_in = now + value * 1000;
          break;
        case 'm':
          expires_in = now + value * 60 * 1000;
          break;
        case 'h':
          expires_in = now + value * 60 * 60 * 1000;
          break;
        case 'd':
          expires_in = now + value * 24 * 60 * 60 * 1000;
          break;
        default:
          throw new Error('Invalid time unit');
      }
    } else {
      throw new Error('Invalid expiresIn format');
    }
  } else if (typeof expiresIn === 'number') {
    expires_in = Date.now() + expiresIn * 1000;
  } else {
    throw new Error('expiresIn must be a string or number');
  }
  return {token,expires_in}
};


export const tokenVerify = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new CustomError('Access denied. No token provided', 401);
  }

  jwt.verify(token, JWT_ACCESS_TOKEN_SECRET as string, (err, decoded) => {
      if (err) {
        throw new CustomError('Token expired', 401);
      }

      req.context = decoded as DecodedToken;
      next();
  });
};