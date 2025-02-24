import authRouter from '@/modules/auth/auth.routes';
import assignmentRoute from '@/modules/assignment/assignment.routes';
import gradeRoute from '@/modules/grade/grade.routes';
import express from 'express';
import { tokenVerify } from '@/middlewares/jwt.service';


const router = express.Router();

router.use('/auth', authRouter);
router.use(tokenVerify)
router.use('/assignments', assignmentRoute);
router.use('/grades', gradeRoute);


export default router;
