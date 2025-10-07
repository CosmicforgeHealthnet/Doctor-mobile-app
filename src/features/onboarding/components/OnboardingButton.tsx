// src/features/onboarding/components/OnboardingButton.tsx
import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface OnboardingButtonProps {
   title: string;
   onPress: () => void;
   loading?: boolean;
   variant?: "primary" | "secondary";
   className?: string;
}

export function OnboardingButton({
   title,
   onPress,
   loading = false,
   variant = "primary",
   className = "",
}: OnboardingButtonProps) {
   const baseStyles = "w-full py-lg rounded-xl items-center justify-center";

   const variantStyles = {
      primary: "bg-primary active:bg-primaryDark",
      secondary: "bg-transparent border-2 border-primary active:bg-primary/10",
   };

   const textVariantStyles = {
      primary: "text-white",
      secondary: "text-primary",
   };

   return (
      <TouchableOpacity
         className={`${baseStyles} ${variantStyles[variant]} ${className}`}
         onPress={onPress}
         disabled={loading}
         activeOpacity={0.8}
      >
         {loading ? (
            <ActivityIndicator color={variant === "primary" ? "#FFFFFF" : "#007AFF"} />
         ) : (
            <Text className={`text-lg font-semibold ${textVariantStyles[variant]}`}>{title}</Text>
         )}
      </TouchableOpacity>
   );
}
