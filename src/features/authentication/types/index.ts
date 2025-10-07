export interface SignupFormData {
   fullName: string;
   email: string;
   department: string;
   password: string;
   confirmPassword: string;
   agreeToTerms: boolean;
}

export interface SignupFormErrors {
   fullName?: string;
   email?: string;
   department?: string;
   password?: string;
   confirmPassword?: string;
   agreeToTerms?: string;
}

export interface LoginFormData {
   email: string;
   password: string;
   rememberMe: boolean;
}

export interface LoginFormErrors {
   email?: string;
   password?: string;
}

export interface User {
   id: string;
   name: string;
   email: string;
   department: string;
   avatar?: string;
}

export interface AuthResponse {
   token: string;
   refreshToken: string;
   user: User;
}
