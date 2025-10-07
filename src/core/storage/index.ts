// @ts-nocheck
import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys
const STORAGE_KEYS = {
   AUTH_TOKEN: "@auth_token",
   REFRESH_TOKEN: "@refresh_token",
   USER_DATA: "@user_data",
   THEME: "@theme",
   LANGUAGE: "@language",
   ONBOARDING_COMPLETED: "@onboarding_completed",
   APP_SETTINGS: "@app_settings",
} as const;

// Generic type for stored data
type StorageValue = string | number | boolean | object | null;

class Storage {
   /**
    * Save a value to storage
    */
   async setItem(key: string, value: StorageValue): Promise<void> {
      try {
         const serializedValue = JSON.stringify(value);
         await AsyncStorage.setItem(key, serializedValue);
      } catch (error) {
         console.error(`Error saving ${key} to storage:`, error);
         throw new Error(`Failed to save ${key}`);
      }
   }

   /**
    * Get a value from storage
    */
   async getItem<T = StorageValue>(key: string): Promise<T | null> {
      try {
         const value = await AsyncStorage.getItem(key);
         if (value === null) {
            return null;
         }
         return JSON.parse(value) as T;
      } catch (error) {
         console.error(`Error reading ${key} from storage:`, error);
         return null;
      }
   }

   /**
    * Remove a value from storage
    */
   async removeItem(key: string): Promise<void> {
      try {
         await AsyncStorage.removeItem(key);
      } catch (error) {
         console.error(`Error removing ${key} from storage:`, error);
         throw new Error(`Failed to remove ${key}`);
      }
   }

   /**
    * Clear all storage
    */
   async clear(): Promise<void> {
      try {
         await AsyncStorage.clear();
      } catch (error) {
         console.error("Error clearing storage:", error);
         throw new Error("Failed to clear storage");
      }
   }

   /**
    * Get all keys from storage
    */
   async getAllKeys(): Promise<string[] | any> {
      try {
         return await AsyncStorage.getAllKeys();
      } catch (error) {
         console.error("Error getting all keys:", error);
         return [];
      }
   }

   /**
    * Store multiple items at once
    */
   async multiSet(keyValuePairs: Array<[string, StorageValue]>): Promise<void> {
      try {
         const serializedPairs = keyValuePairs.map(([key, value]) => [key, JSON.stringify(value)]);
         await AsyncStorage.multiSet(serializedPairs);
      } catch (error) {
         console.error("Error saving multiple items:", error);
         throw new Error("Failed to save multiple items");
      }
   }

   /**
    * Get multiple items at once
    */
   async multiGet<T = StorageValue>(keys: string[]): Promise<Record<string, T | null>> {
      try {
         const results = await AsyncStorage.multiGet(keys);
         const parsed: Record<string, T | null> = {};

         results.forEach(([key, value]) => {
            parsed[key] = value ? JSON.parse(value) : null;
         });

         return parsed;
      } catch (error) {
         console.error("Error getting multiple items:", error);
         return {};
      }
   }

   // ============= Auth-specific methods =============

   async setToken(token: string): Promise<void> {
      return this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
   }

   async getToken(): Promise<string | null> {
      return this.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
   }

   async removeToken(): Promise<void> {
      return this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
   }

   async setRefreshToken(token: string): Promise<void> {
      return this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
   }

   async getRefreshToken(): Promise<string | null> {
      return this.getItem<string>(STORAGE_KEYS.REFRESH_TOKEN);
   }

   async removeRefreshToken(): Promise<void> {
      return this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
   }

   async setUserData<T extends object>(userData: T): Promise<void> {
      return this.setItem(STORAGE_KEYS.USER_DATA, userData);
   }

   async getUserData<T = any>(): Promise<T | null> {
      return this.getItem<T>(STORAGE_KEYS.USER_DATA);
   }

   async removeUserData(): Promise<void> {
      return this.removeItem(STORAGE_KEYS.USER_DATA);
   }

   /**
    * Clear all authentication data
    */
   async clearAuth(): Promise<void> {
      try {
         await AsyncStorage.multiRemove([
            STORAGE_KEYS.AUTH_TOKEN,
            STORAGE_KEYS.REFRESH_TOKEN,
            STORAGE_KEYS.USER_DATA,
         ]);
      } catch (error) {
         console.error("Error clearing auth data:", error);
         throw new Error("Failed to clear auth data");
      }
   }

   /**
    * Check if user is authenticated
    */
   async isAuthenticated(): Promise<boolean> {
      const token = await this.getToken();
      return token !== null;
   }

   // ============= App Settings methods =============

   async setTheme(theme: "light" | "dark" | "system"): Promise<void> {
      return this.setItem(STORAGE_KEYS.THEME, theme);
   }

   async getTheme(): Promise<"light" | "dark" | "system" | null> {
      return this.getItem<"light" | "dark" | "system">(STORAGE_KEYS.THEME);
   }

   async setLanguage(language: string): Promise<void> {
      return this.setItem(STORAGE_KEYS.LANGUAGE, language);
   }

   async getLanguage(): Promise<string | null> {
      return this.getItem<string>(STORAGE_KEYS.LANGUAGE);
   }

   async setOnboardingCompleted(completed: boolean): Promise<void> {
      return this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
   }

   async hasCompletedOnboarding(): Promise<boolean> {
      const completed = await this.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED);
      return completed === true;
   }

   async setAppSettings<T extends object>(settings: T): Promise<void> {
      return this.setItem(STORAGE_KEYS.APP_SETTINGS, settings);
   }

   async getAppSettings<T = any>(): Promise<T | null> {
      return this.getItem<T>(STORAGE_KEYS.APP_SETTINGS);
   }

   // ============= Utility methods =============

   /**
    * Check if a key exists in storage
    */
   async hasKey(key: string): Promise<boolean> {
      try {
         const value = await AsyncStorage.getItem(key);
         return value !== null;
      } catch (error) {
         return false;
      }
   }

   /**
    * Get storage size info (useful for debugging)
    */
   async getStorageInfo(): Promise<{ keys: number; estimatedSize: string }> {
      try {
         const keys = await this.getAllKeys();
         const allData = await AsyncStorage.multiGet(keys);

         const totalSize = allData.reduce((acc, [, value]) => {
            return acc + (value?.length || 0);
         }, 0);

         return {
            keys: keys.length,
            estimatedSize: `${(totalSize / 1024).toFixed(2)} KB`,
         };
      } catch (error) {
         console.error("Error getting storage info:", error);
         return { keys: 0, estimatedSize: "0 KB" };
      }
   }
}

// Export singleton instance
export const storage = new Storage();

// Export storage keys for use in the app
export { STORAGE_KEYS };
