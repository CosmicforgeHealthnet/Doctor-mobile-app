import React from "react";
import { View, Image, Text, Dimensions } from "react-native";
import Animated, { FadeInDown, FadeInUp, ZoomIn } from "react-native-reanimated";
import { OnboardingSlideData } from "../data/onboardingData";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

interface OnboardingSlideProps {
   slide: OnboardingSlideData;
}

export function OnboardingSlide({ slide }: OnboardingSlideProps) {
   const renderTitle = () => {
      if (!slide.titleHighlight) {
         return (
            <Text className="text-3xl font-bold text-text text-center px-lg">{slide.title}</Text>
         );
      }

      const parts = slide.title.split(slide.titleHighlight);

      return (
         <Text className="text-3xl font-poppins-bold text-text text-center px-lg">
            {parts[0]}
            <Text className="text-primary">{slide.titleHighlight}</Text>
            {parts[1]}
         </Text>
      );
   };

   return (
      <View
         className="flex-1 justify-center"
         style={{ width }}
      >
         {/* Image Container with striped background */}
         <Animated.View
            className="w-full items-center justify-center relative"
            style={{ height: height * 0.5 }}
            entering={ZoomIn.duration(600).delay(200)}
         >
            {/* Doctor Image */}
            <Image
               source={slide.image}
               className="w-4/5 h-full rounded-2xl"
               resizeMode="contain"
            />
            {/* This is the blur Background */}
            <LinearGradient
               colors={["transparent", "#FFFFFF"]}
               locations={[0, 2]}
               className="absolute bottom-0 left-0 right-0 h-[300px] rounded-b-2xl pb-5"
               style={{
                  width: "100%",
                  alignSelf: "center",
               }}
            />{" "}
         </Animated.View>

         {/* Title */}
         <Animated.View
            className="mt-md"
            entering={FadeInUp.duration(600).delay(400)}
         >
            {renderTitle()}
         </Animated.View>

         {/* Description */}
         <Animated.View entering={FadeInDown.duration(600).delay(600)}>
            <Text className="text-base mt-2 text-textGray font-supreme-medium text-center px-lg">
               {slide.description}
            </Text>
         </Animated.View>
      </View>
   );
}
