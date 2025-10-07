import { apiClient } from "@/core/api/client";

export interface SignupRequest {
   fullName: string;
   email: string;
   department: string;
   password: string;
}

export interface LoginRequest {
   email: string;
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
      return apiClient.post<AuthResponse>("/auth/signup", data);
   },

   login: async (data: LoginRequest): Promise<AuthResponse> => {
      return apiClient.post<AuthResponse>("/auth/login", data);
   },

   logout: async (): Promise<void> => {
      return apiClient.post("/auth/logout");
   },

   verifyEmail: async (token: string): Promise<void> => {
      return apiClient.post("/auth/verify-email", { token });
   },

   forgotPassword: async (email: string): Promise<void> => {
      return apiClient.post("/auth/forgot-password", { email });
   },

   resetPassword: async (token: string, password: string): Promise<void> => {
      return apiClient.post("/auth/reset-password", { token, password });
   },
};
