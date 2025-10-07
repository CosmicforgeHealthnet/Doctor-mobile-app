import { api } from "@/core/api/client";

export interface SignupRequest {
   name: string;
   email: string;
   department: string;
   password: string;
}

export interface AuthResponse {
   token: string;
   refreshToken: string;
   user: {
      id: string;
      name: string;
      email: string;
      department: string;
   };
}

export const authService = {
   signup: async (data: SignupRequest): Promise<AuthResponse> => {
      return api.post<AuthResponse>("/auth/signup", data);
   },

   login: async (email: string, password: string): Promise<AuthResponse> => {
      return api.post<AuthResponse>("/auth/login", { email, password });
   },

   logout: async (): Promise<void> => {
      return api.post("/auth/logout");
   },

   verifyEmail: async (token: string): Promise<void> => {
      return api.post("/auth/verify-email", { token });
   },

   forgotPassword: async (email: string): Promise<void> => {
      return api.post("/auth/forgot-password", { email });
   },

   resetPassword: async (token: string, password: string): Promise<void> => {
      return api.post("/auth/reset-password", { token, password });
   },
};
