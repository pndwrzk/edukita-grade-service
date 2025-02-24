import express from 'express';
import { CustomError } from './custom-error';


export const errorHandler = (err: Error | CustomError, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(err){
        const statusCode = err instanceof CustomError ? err.statusCode : 500;
       res.status(statusCode).json({
           message: err.message || 'Internal Server Error',
           data :err instanceof CustomError ? err.data : null
       });
       return
       }
       next();
};


