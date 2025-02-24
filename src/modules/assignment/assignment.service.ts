

import { CreateAssignment,Assignment,AssignmentResponse   } from '@/interfaces/assignment.interfaces';
import { CustomError, DataValidator } from '@/utils/custom-error';
import { validateCreateAssignment } from './assignment.validator';
import repo from './assignment.repo';
import httpStatus from 'http-status';
export const createAssignmentService =  async (body: CreateAssignment, idUserLogin : number | undefined):Promise<Assignment> => {
    if(!idUserLogin){
        throw new CustomError('user not found', httpStatus.NOT_FOUND);
    }
    body.user_id = idUserLogin;
 const { error } = validateCreateAssignment(body);
    if (error) {
        const dataError = DataValidator(error);
        throw new CustomError('request body is invalid', httpStatus.BAD_REQUEST,dataError);
      }
   const assignmentData =  await repo.createAssignment(body)
   return assignmentData;
}

export const getListAssignmentService =  async (subjectParam: string):Promise<AssignmentResponse[]>  => {
    const response = await repo.getListAssignment(subjectParam);
    return response;
   }