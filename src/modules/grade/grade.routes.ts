import express from 'express';
import {  createGradeController,getListGradeController} from './grade.controller';
import {roleValidate} from '@/middlewares/role.validate';

const gradeRoute = express.Router();
gradeRoute.post('/', roleValidate(['teacher']),createGradeController);
gradeRoute.get('/', roleValidate(['student']),getListGradeController);



export default gradeRoute;
