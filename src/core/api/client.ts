// core/api/client.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import Constants from "expo-constants";
import { storage } from "../storage";

// API Configuration
const API_BASE_URL =
   Constants.expoConfig?.extra?.apiUrl || "https://backend.cosmicforge-healthnet.com";
const API_TIMEOUT = 30000; // 30 seconds

// Response wrapper type
export interface ApiResponse<T = any> {
   data: T;
   message?: string;
   success: boolean;
}

// Error response type
export interface ApiError {
   message: string;
   statusCode?: number;
   errors?: Record<string, string[]>;
}

class ApiClient {
   private client: AxiosInstance;
   private refreshTokenPromise: Promise<string> | null = null;

   constructor() {
      this.client = axios.create({
         baseURL: `${API_BASE_URL}`,
         timeout: API_TIMEOUT,
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
         },
      });

      this.setupInterceptors();
   }

   private setupInterceptors(): void {
      // Request Interceptor - Add auth token
      this.client.interceptors.request.use(
         async (config) => {
            const token = await storage.getToken();
            if (token && config.headers) {
               config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
         },
         (error) => {
            return Promise.reject(error);
         },
      );

      // Response Interceptor - Handle errors and token refresh
      this.client.interceptors.response.use(
         (response) => response,
         async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

            // Handle 401 Unauthorized - Token expired
            if (error.response?.status === 401 && !originalRequest._retry) {
               originalRequest._retry = true;

               try {
                  // Prevent multiple refresh token requests
                  if (!this.refreshTokenPromise) {
                     this.refreshTokenPromise = this.handleTokenRefresh();
                  }

                  const newToken = await this.refreshTokenPromise;
                  this.refreshTokenPromise = null;

                  // Retry original request with new token
                  if (originalRequest.headers) {
                     originalRequest.headers.Authorization = `Bearer ${newToken}`;
                  }
                  return this.client(originalRequest);
               } catch (refreshError) {
                  // Refresh failed - clear auth and redirect to login
                  await storage.clearAuth();
                  // You can emit an event here to trigger navigation to login
                  // eventEmitter.emit('UNAUTHORIZED');
                  return Promise.reject(refreshError);
               }
            }

            return Promise.reject(this.handleError(error));
         },
      );
   }

   private async handleTokenRefresh(): Promise<string> {
      try {
         const refreshToken = await storage.getRefreshToken();
         if (!refreshToken) {
            throw new Error("No refresh token available");
         }

         const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
         });

         const { token, refreshToken: newRefreshToken } = response.data;

         await storage.setToken(token);
         if (newRefreshToken) {
            await storage.setRefreshToken(newRefreshToken);
         }

         return token;
      } catch (error) {
         await storage.clearAuth();
         throw error;
      }
   }

   private handleError(error: AxiosError): ApiError {
      if (error.response) {
         // Server responded with error
         return {
            message: (error.response.data as any)?.message || "An error occurred",
            statusCode: error.response.status,
            errors: (error.response.data as any)?.errors,
         };
      } else if (error.request) {
         // Request made but no response
         return {
            message: "Network error. Please check your connection.",
            statusCode: 0,
         };
      } else {
         // Something else happened
         return {
            message: error.message || "An unexpected error occurred",
         };
      }
   }

   // HTTP Methods
   async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return response.data;
   }

   async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      return response.data;
   }

   async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
      const response: AxiosResponse<T> = await this.client.put(url, data, config);
      return response.data;
   }

   async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
      const response: AxiosResponse<T> = await this.client.patch(url, data, config);
      return response.data;
   }

   async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      const response: AxiosResponse<T> = await this.client.delete(url, config);
      return response.data;
   }

   // File upload helper
   async uploadFile<T>(
      url: string,
      file: { uri: string; name: string; type: string },
      additionalData?: Record<string, any>,
   ): Promise<T> {
      const formData = new FormData();

      formData.append("file", {
         uri: file.uri,
         name: file.name,
         type: file.type,
      } as any);

      if (additionalData) {
         Object.keys(additionalData).forEach((key) => {
            formData.append(key, additionalData[key]);
         });
      }

      return this.post<T>(url, formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
   }

   // Get the axios instance for advanced usage
   getClient(): AxiosInstance {
      return this.client;
   }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export convenient methods
export const api = {
   get: <T>(url: string, config?: AxiosRequestConfig) => apiClient.get<T>(url, config),
   post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      apiClient.post<T>(url, data, config),
   put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      apiClient.put<T>(url, data, config),
   patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
      apiClient.patch<T>(url, data, config),
   delete: <T>(url: string, config?: AxiosRequestConfig) => apiClient.delete<T>(url, config),
   uploadFile: <T>(
      url: string,
      file: { uri: string; name: string; type: string },
      additionalData?: Record<string, any>,
   ) => apiClient.uploadFile<T>(url, file, additionalData),
};
