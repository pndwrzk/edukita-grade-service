export interface Assignment {
    id: number;
    subject: string;
    title: string;
    content: string;
    user_id: number;
    created_at: string | undefined;
    updated_at: string | undefined;
  }
  
  export interface CreateAssignment {
    subject: string;
    title: string;
    content: string;
    user_id: number ;
  }  


  export interface AssignmentResponse {
    id: number;
    subject: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    grade: {
      grade: number;
      feedback: string;
  } | null;
    student:  {
      name: string;
      email: string;
  };
}



