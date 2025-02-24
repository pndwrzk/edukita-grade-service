export interface Grade {
    id: number;
    user_id: number;
    assignment_id: number;
    feedback: string;
    grade: number;
    created_at: string | undefined;
    updated_at: string | undefined;
  }

export interface CreateGrade {
    user_id: number;
    assignment_id: number;
    feedback: string;
    grade: number;
  }
  

  export interface GradeResponse {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    grade: {
      grade: number;
      feedback: string;
      user: {
        name: string;
        email: string;
    }
    ;
  } | null;
}
 