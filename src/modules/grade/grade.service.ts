
import { CreateGrade,Grade } from '@/interfaces/grade.interfaces';
import repo from './grade.repo';
import { validateCreateGrade } from './grade.validator';
import { CustomError, DataValidator } from '@/utils/custom-error';
import httpStatus from 'http-status';

export const createGradeService =  async (body: CreateGrade,idUserLogin: number | undefined
):Promise<Grade> => {
    if(!idUserLogin){
        throw new CustomError('user not found', httpStatus.FORBIDDEN);
    }
    body.user_id = idUserLogin;
     const  {error}  = validateCreateGrade(body);
        if (error) {
           const dataError = DataValidator(error);
           throw new CustomError('request body is invalid', httpStatus.BAD_REQUEST,dataError);
         }

    const isExists = await repo.getGradeByAssignmentId(body.assignment_id)
    if (isExists) {
        throw new CustomError('Assignment has already been graded.', httpStatus.CONFLICT);
    }
    
    const response = await repo.createGrade(body);
    return response;
}


export const getGradeService = async (idUserLogin: number | undefined) =>{
    if(!idUserLogin){
        throw new CustomError('user not found', httpStatus.FORBIDDEN);
    }
    const response = await repo.getGrade(idUserLogin);
    return response
}