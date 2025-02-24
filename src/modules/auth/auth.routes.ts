import express from 'express';
import {  registerController ,loginController, refreshTokenAccess} from './auth.controller';

const authRouter = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.post('/refresh-token', refreshTokenAccess);


export default authRouter;
