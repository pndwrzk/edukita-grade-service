import { DB } from '@/database';
import { CreateGrade,Grade ,GradeResponse} from '@/interfaces/grade.interfaces';



const repo = {
    
    createGrade: async (gradeData: CreateGrade): Promise<Grade> => {
        return await DB.Grade.create(gradeData);
    },
    
    getGrade : async(idUserLogin : number):Promise<GradeResponse[]>=>{
        const assignments = await DB.Assignment.findAll({
            where: { user_id: idUserLogin },
            include: [
                {
                    model: DB.Grade,
                    as: 'grade',
                    required: false,
                    attributes: [ 'grade', 'feedback'],
                    include: [
                        {
                            model: DB.User,
                            as: 'teacher', 
                            attributes: ['name', 'email'],
                        },
                    ],
                },
            ],
            attributes: ['id', 'title', 'content', 'created_at', 'updated_at'],
        });
        
        return assignments as unknown as GradeResponse[];
    }
    
};

export default repo;
