import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
   label?: string;
   error?: string;
   icon?: React.ReactNode;
   rightIcon?: React.ReactNode;
   onRightIconPress?: () => void;
   containerClassName?: string;
}

export function Input({
   label,
   error,
   icon,
   rightIcon,
   onRightIconPress,
   containerClassName = "",
   className = "",
   ...props
}: InputProps) {
   const [isFocused, setIsFocused] = useState(false);

   return (
      <View className={`mb-md ${containerClassName}`}>
         {label && <Text className="text-base font-poppins text-text mb-xs">{label}</Text>}

         <View
            className={`flex-row items-center bg-surface border rounded-[18px] px-md py-md ${
               error ? "border-error" : isFocused ? "border-primary" : "border-borderLight"
            }`}
         >
            {icon && <View className="mr-sm">{icon}</View>}

            <TextInput
               className={`flex-1 text-base font-poppins-medium text-text py-xs ${className}`}
               placeholderTextColor="#9CA3AF"
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
               {...props}
            />

            {rightIcon && (
               <TouchableOpacity
                  onPress={onRightIconPress}
                  className="ml-sm"
               >
                  {rightIcon}
               </TouchableOpacity>
            )}
         </View>

         {error && <Text className="text-xs font-supreme text-error mt-xs">{error}</Text>}
      </View>
   );
}
