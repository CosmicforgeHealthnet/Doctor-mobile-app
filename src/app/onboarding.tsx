import React from "react";
import { View, FlatList, Animated, Dimensions, TouchableOpacity, Text } from "react-native";
import { OnboardingSlide } from "@/features/onboarding/components/OnboardingSlide";
import { Pagination } from "@/features/onboarding/components/Pagination";
import { OnboardingButton } from "@/features/onboarding/components/OnboardingButton";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
   const {
      currentIndex,
      isLastSlide,
      isFirstSlide,
      loading,
      slides,
      scrollX,
      slidesRef,
      viewableItemsChanged,
      viewConfig,
      handleButtonPress,
      skipToEnd,
      getButtonTitle,
   } = useOnboarding();

   return (
      <SafeAreaView className="flex-1 bg-white">
         <View className="flex-1">
            {/* Skip Button */}
            {!isLastSlide && (
               <View className="absolute top-4 right-4 z-10">
                  <TouchableOpacity
                     onPress={skipToEnd}
                     className="px-md py-sm"
                     activeOpacity={0.7}
                  >
                     <Text className="text-base text-textSecondary font-supreme-medium">Skip</Text>
                  </TouchableOpacity>
               </View>
            )}

            {/* Slides */}
            <View className="flex-1">
               <FlatList
                  ref={slidesRef}
                  data={slides}
                  renderItem={({ item }) => <OnboardingSlide slide={item} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  bounces={false}
                  keyExtractor={(item) => item.id}
                  onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                     useNativeDriver: false,
                  })}
                  scrollEventThrottle={32}
                  onViewableItemsChanged={viewableItemsChanged}
                  viewabilityConfig={viewConfig}
               />
            </View>

            {/* Bottom Section */}
            <View className="px-xl pb-lg">
               {/* Pagination Dots */}
               <Pagination
                  data={slides}
                  scrollX={scrollX}
                  width={width}
               />

               {/* Button */}
               <OnboardingButton
                  title={getButtonTitle()}
                  onPress={handleButtonPress}
                  loading={loading}
                  variant="primary"
               />
            </View>
         </View>
      </SafeAreaView>
   );
}
