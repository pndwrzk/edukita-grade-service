
import { CreateGrade,Grade } from '@/interfaces/grade.interfaces';
import repo from './grade.repo';
import { validateCreateGrade } from './grade.validator';
import { CustomError, DataValidator } from '@/utils/custom-error';

export const createGradeService =  async (body: CreateGrade,idUserLogin: number | undefined
):Promise<Grade> => {
    if(!idUserLogin){
        throw new CustomError('user not found', 403);
    }
    body.user_id = idUserLogin;
     const  {error}  = validateCreateGrade(body);
        if (error) {
           const dataError = DataValidator(error);
           throw new CustomError('request body is invalid', 400,dataError);
         }
    const response = await repo.createGrade(body);
    return response;
}


export const getGradeService = async (idUserLogin: number | undefined) =>{
    if(!idUserLogin){
        throw new CustomError('user not found', 403);
    }
    const response = await repo.getGrade(idUserLogin);
    return response
}