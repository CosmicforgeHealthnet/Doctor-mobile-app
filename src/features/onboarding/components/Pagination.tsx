import React from "react";
import { View, Animated, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface PaginationProps {
   data: any[];
   scrollX: Animated.Value;
   width?: number;
}

export function Pagination({ data, scrollX, width = screenWidth }: PaginationProps) {
   return (
      <View className="flex-row justify-center items-center mb-lg">
         {data.map((_, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

            // Animate dot width - expands when active
            const dotWidth = scrollX.interpolate({
               inputRange,
               outputRange: [8, 24, 8],
               extrapolate: "clamp",
            });

            // Animate dot opacity - brighter when active
            const opacity = scrollX.interpolate({
               inputRange,
               outputRange: [0.3, 1, 0.3],
               extrapolate: "clamp",
            });

            return (
               <Animated.View
                  key={`dot-${index}`}
                  className="h-2 rounded-full bg-primary mx-1"
                  style={{
                     width: dotWidth,
                     opacity,
                  }}
               />
            );
         })}
      </View>
   );
}
