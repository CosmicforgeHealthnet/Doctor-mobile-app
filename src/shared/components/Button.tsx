// src/shared/components/Button.tsx
import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent, ActivityIndicator } from "react-native";

interface ButtonProps {
   title: string;
   onPress: (event: GestureResponderEvent) => void;
   variant?: "primary" | "secondary";
   disabled?: boolean;
   className?: string;
   loading?: boolean;
}

export function Button({
   title,
   onPress,
   variant = "primary",
   disabled = false,
   className = "",
   loading = false,
}: ButtonProps) {
   const baseStyles = "px-md py-md rounded-md items-center my-xs";

   const variantStyles = {
      primary: "bg-primary active:bg-primaryDark",
      secondary: "bg-transparent border-2 border-primary active:bg-primary/10",
   };

   const textVariantStyles = {
      primary: "text-white",
      secondary: "text-primary",
   };

   const disabledStyles = disabled ? "opacity-50" : "";

   return (
      <TouchableOpacity
         className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
         onPress={onPress}
         disabled={disabled}
         activeOpacity={0.7}
      >
         {loading ? (
            <ActivityIndicator color={variant === "primary" ? "#FFFFFF" : "#007AFF"} />
         ) : (
            <Text className={`text-lg font-semibold ${textVariantStyles[variant]}`}>{title}</Text>
         )}{" "}
      </TouchableOpacity>
   );
}
