// src/features/authentication/hooks/useSignup.ts
import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { SignupFormData, SignupFormErrors } from "../types";
import { authService } from "../services/authService";
import { storage } from "@/core/storage";
import { validateSignupForm } from "../utils/validation";

const initialFormData: SignupFormData = {
   fullName: "",
   email: "",
   department: "",
   password: "",
   confirmPassword: "",
   agreeToTerms: false,
};

export const useSignup = () => {
   const router = useRouter();
   const [formData, setFormData] = useState<SignupFormData>(initialFormData);
   const [errors, setErrors] = useState<SignupFormErrors>({});
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const updateField = <K extends keyof SignupFormData>(field: K, value: SignupFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field when user starts typing
      if (errors[field]) {
         setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
   };

   const handleSignup = async () => {
      try {
         // Validate form
         const validationErrors = validateSignupForm(formData);

         if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
         }

         setLoading(true);
         setErrors({});

         // Call signup API
         const response = await authService.signup({
            name: formData.fullName,
            email: formData.email,
            department: formData.department,
            password: formData.password,
         });

         // Store auth data
         await storage.setToken(response.token);
         await storage.setRefreshToken(response.refreshToken);
         await storage.setUserData(response.user);

         // Show success message
         Alert.alert("Success", "Account created successfully!", [
            {
               text: "OK",
               onPress: () => router.replace("/(tabs)"),
            },
         ]);
      } catch (error: any) {
         console.error("Signup error:", error);

         // Handle specific error messages from API
         if (error.message?.toLowerCase().includes("email")) {
            setErrors({ email: "This email is already registered" });
         } else if (error.message?.toLowerCase().includes("password")) {
            setErrors({ password: error.message });
         } else {
            Alert.alert(
               "Signup Failed",
               error.message || "Unable to create account. Please try again.",
            );
         }
      } finally {
         setLoading(false);
      }
   };

   const navigateToLogin = () => {
      router.push("/(auth)/login");
   };

   const resetForm = () => {
      setFormData(initialFormData);
      setErrors({});
      setShowPassword(false);
      setShowConfirmPassword(false);
   };

   return {
      // State
      formData,
      errors,
      loading,
      showPassword,
      showConfirmPassword,

      // Actions
      updateField,
      setShowPassword,
      setShowConfirmPassword,
      handleSignup,
      navigateToLogin,
      resetForm,
   };
};
