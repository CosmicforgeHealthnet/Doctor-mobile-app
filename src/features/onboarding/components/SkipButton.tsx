import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface SkipButtonProps {
   onPress: () => void;
   className?: string;
}

export function SkipButton({ onPress, className = "" }: SkipButtonProps) {
   return (
      <TouchableOpacity
         onPress={onPress}
         className={`px-md py-sm ${className}`}
         activeOpacity={0.7}
      >
         <Text className="text-base text-textSecondary font-medium">Skip</Text>
      </TouchableOpacity>
   );
}
