import { DB } from '@/database';
import { CreateAssignment,Assignment, AssignmentResponse} from '@/interfaces/assignment.interfaces';



const repo = {
    
    createAssignment: async (assignmentData: CreateAssignment): Promise<Assignment> => {
        return await DB.Assignment.create(assignmentData);
    },

    getListAssignment: async (subjectParam?: string): Promise<AssignmentResponse[]> => {
        const assignments = await DB.Assignment.findAll({
            where: subjectParam ? { subject :subjectParam } : {},
            include: [
                {
                    model: DB.Grade,
                    as: 'grade',
                    required: false,
                    attributes: [ 'grade', 'feedback'],
                },
                {
                    model: DB.Users,
                    as: 'student',
                    required: false,
                    attributes: [ 'name', 'email'],
                },
                
            ],
            attributes :['id', 'subject', 'title', 'content', 'created_at', 'updated_at']
        });
              return assignments as unknown as AssignmentResponse[];
    }
        
    
};

export default repo;
