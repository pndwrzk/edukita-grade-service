import express from 'express';
import { createAssignmentController,getListAssignmentController} from './assignment.controller';
import {roleValidate} from '@/middlewares/role.validate';


const assignmentRoute = express.Router();
assignmentRoute.post('/', roleValidate(['student']),createAssignmentController);
assignmentRoute.get('/',roleValidate(['teacher']), getListAssignmentController);



export default assignmentRoute;
