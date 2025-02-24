

import { CreateAssignment,Assignment,AssignmentResponse   } from '@/interfaces/assignment.interfaces';
import { CustomError, DataValidator } from '@/utils/custom-error';
import { validateCreateAssignment } from './assignment.validator';
import repo from './assignment.repo';
export const createAssignmentService =  async (body: CreateAssignment, idUserLogin : number | undefined):Promise<Assignment> => {
    if(!idUserLogin){
        throw new CustomError('user not found', 403);
    }
    body.user_id = idUserLogin;
 const { error } = validateCreateAssignment(body);
    if (error) {
        const dataError = DataValidator(error);
        throw new CustomError('request body is invalid', 400,dataError);
      }
   const assignmentData =  await repo.createAssignment(body)
   return assignmentData;
}

export const getListAssignmentService =  async (subjectParam: string):Promise<AssignmentResponse[]>  => {
    const response = await repo.getListAssignment(subjectParam);
    return response;
   }