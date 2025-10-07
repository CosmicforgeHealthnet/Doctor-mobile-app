// src/shared/components/Dropdown.tsx
import React, { useState } from "react";
import {
   View,
   Text,
   TouchableOpacity,
   Modal,
   ScrollView,
   Dimensions,
   Pressable,
} from "react-native";

const { height } = Dimensions.get("window");

interface DropdownProps {
   label?: string;
   placeholder?: string;
   value: string;
   options: readonly string[] | string[];
   onSelect: (value: string) => void;
   error?: string;
   disabled?: boolean;
   className?: string;
}

export function Dropdown({
   label,
   placeholder = "Select an option",
   value,
   options,
   onSelect,
   error,
   disabled = false,
   className = "",
}: DropdownProps) {
   const [isOpen, setIsOpen] = useState(false);

   const handleSelect = (option: string) => {
      onSelect(option);
      setIsOpen(false);
   };

   const displayValue =
      value && value !== "Select Department (If applicable)" ? value : placeholder;

   const hasValue = value && value !== placeholder && value !== "Select Department (If applicable)";

   return (
      <View className={`mb-md ${className}`}>
         {/* Label */}
         {label && <Text className="text-base font-poppins text-text mb-xs">{label}</Text>}

         {/* Dropdown Trigger Button */}
         <TouchableOpacity
            onPress={() => !disabled && setIsOpen(true)}
            disabled={disabled}
            activeOpacity={0.7}
            className={`bg-surface border rounded-[18px] px-md py-md flex-row justify-between items-center ${
               error ? "border-error" : "border-borderLight"
            } ${disabled ? "opacity-50" : ""}`}
         >
            <Text
               className={`text-base font-poppins-medium flex-1 ${
                  hasValue ? "text-text" : "text-textSecondary"
               }`}
               numberOfLines={1}
            >
               {displayValue}
            </Text>

            {/* Dropdown Arrow */}
            <Text className="text-textSecondary ml-sm">▼</Text>
         </TouchableOpacity>

         {/* Error Message */}
         {error && <Text className="text-xs font-supreme text-error mt-xs">{error}</Text>}

         {/* Modal with Options */}
         <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setIsOpen(false)}
         >
            {/* Backdrop */}
            <Pressable
               className="flex-1 bg-black/50 justify-center items-center px-lg"
               onPress={() => setIsOpen(false)}
            >
               {/* Modal Content */}
               <Pressable
                  className="bg-background  rounded-2xl overflow-hidden shadow-lg"
                  style={{ maxHeight: height * 0.7 }}
                  onPress={(e) => e.stopPropagation()}
               >
                  {/* Header */}
                  <View className="px-lg py-md border-b border-borderLight bg-surface">
                     <Text className="text-lg font-supreme-bold text-text">
                        {label || "Select an option"}
                     </Text>
                  </View>

                  {/* Options List */}
                  <ScrollView className="flex-1">
                     {options.map((option, index) => {
                        const isSelected = value === option;
                        const isPlaceholder = option === "Select Department (If applicable)";

                        return (
                           <TouchableOpacity
                              key={`${option}-${index}`}
                              onPress={() => handleSelect(option)}
                              activeOpacity={0.7}
                              className={`px-lg py-md border-b border-borderLight ${
                                 isSelected ? "bg-primary/10" : "bg-background"
                              }`}
                           >
                              <Text
                                 className={`text-base font-supreme ${
                                    isSelected
                                       ? "text-primary font-supreme-semibold"
                                       : isPlaceholder
                                       ? "text-textSecondary"
                                       : "text-text"
                                 }`}
                              >
                                 {option}
                                 {isSelected && " ✓"}
                              </Text>
                           </TouchableOpacity>
                        );
                     })}
                  </ScrollView>

                  {/* Close Button */}
                  <TouchableOpacity
                     onPress={() => setIsOpen(false)}
                     activeOpacity={0.7}
                     className="px-lg py-md bg-surface border-t border-borderLight"
                  >
                     <Text className="text-center text-base font-supreme-semibold text-primary">
                        Close
                     </Text>
                  </TouchableOpacity>
               </Pressable>
            </Pressable>
         </Modal>
      </View>
   );
}
