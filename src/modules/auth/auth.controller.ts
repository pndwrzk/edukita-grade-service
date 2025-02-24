import { NextFunction, Request, Response } from 'express';
import {  registerService ,loginService, refreshTokenService} from './auth.service';
import { CreateUser,LoginUser ,RefreshToken} from '@/interfaces/user.interfaces';
import httpStatus from 'http-status';
export const registerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const bodyRequest : CreateUser = req.body;
        const response = await registerService(bodyRequest);
        res.status(httpStatus.CREATED).json({
            message: 'Successfully register',
            data: response.user,
        });
    } catch (error) {
        next(error);
    }
};

export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const bodyRequest: LoginUser = req.body;
        const response = await loginService(bodyRequest);
        res.status(httpStatus.OK).json({
            message: 'Successfully login',
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

export const refreshTokenAccess = async(  req: Request,
    res: Response,
    next: NextFunction,): Promise<void> => {
        try {
        const bodyRequest :RefreshToken = req.body;
        const response = await refreshTokenService(bodyRequest);
        res.status(httpStatus.OK).json({
            message: 'Successfully refresh token',
            data: response,
        });
    } catch (error) {
        next(error);
    }

}
