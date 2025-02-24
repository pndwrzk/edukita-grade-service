import jwt, { SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@/utils/custom-error';
import { DecodedToken } from '@/interfaces/context.interfaces';
import {
    JWT_ACCESS_TOKEN_SECRET,
  } from "@/config";




export const generateJWT = (payload: object, secret: string, expiresIn: number | StringValue | undefined): {token: string,expires_in: number} => {
  const options: SignOptions = { expiresIn };
  const token = jwt.sign(payload, secret, options);
  const expires_in = Date.now() + Number(expiresIn) * 1000; 
  return {token,expires_in}
};


export const tokenVerify = (req: Request, res: Response, next: NextFunction): void => {

    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
         throw new CustomError('Access denied. No token provided', 401);
    }
    const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET as string) as DecodedToken;
    req.context = decoded; // eslint-disable-line @typescript-eslint/no-explicit-any
    next();
    
    

}
