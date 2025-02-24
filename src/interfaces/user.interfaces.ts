export interface User {
    id: number;
    email: string;
    name: string;
    role:  'student' | 'teacher';
    password: string;
    created_at: string | undefined;
    updated_at: string | undefined;
}

export interface UserResponse {
    id: number;
    email: string;
    name: string;
    role: "student" | "teacher";
    created_at: string | undefined;
    updated_at: string | undefined;
};


export interface LoginResponse {
    token_access : string,
    token_access_expired :number,
    token_refresh : string,
    token_refresh_expired :number
}


export interface CreateUser {
    email: string;
    name: string;
    role:  'student' | 'teacher';
    password: string;
}


export interface LoginUser {
    email: string;
    name: string;
    role:  'student' | 'teacher';
    password: string;
}


export interface RefreshToken {
   refresh_token :string
}