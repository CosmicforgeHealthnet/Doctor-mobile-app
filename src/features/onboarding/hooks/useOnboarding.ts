import { useState, useRef, useCallback } from "react";
import { Animated, FlatList, ViewToken } from "react-native";
import { useRouter } from "expo-router";
import { storage } from "@/core/storage";
import { onboardingSlides } from "../data/onboardingData";

export const useOnboarding = () => {
   const router = useRouter();
   const [currentIndex, setCurrentIndex] = useState(0);
   const [loading, setLoading] = useState(false);
   const scrollX = useRef(new Animated.Value(0)).current;
   const slidesRef = useRef<FlatList>(null);

   // Track viewable items
   const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) {
         setCurrentIndex(viewableItems[0].index || 0);
      }
   }).current;

   const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

   // Check if current slide is the last one
   const isLastSlide = currentIndex === onboardingSlides.length - 1;
   const isFirstSlide = currentIndex === 0;

   // Navigate to next slide
   const scrollToNext = useCallback(() => {
      if (currentIndex < onboardingSlides.length - 1) {
         slidesRef.current?.scrollToIndex({
            index: currentIndex + 1,
            animated: true,
         });
      }
   }, [currentIndex]);

   // Navigate to previous slide
   const scrollToPrevious = useCallback(() => {
      if (currentIndex > 0) {
         slidesRef.current?.scrollToIndex({
            index: currentIndex - 1,
            animated: true,
         });
      }
   }, [currentIndex]);

   // Skip to last slide
   const skipToEnd = useCallback(() => {
      slidesRef.current?.scrollToIndex({
         index: onboardingSlides.length - 1,
         animated: true,
      });
   }, []);

   // Complete onboarding and navigate
   const completeOnboarding = useCallback(async () => {
      try {
         setLoading(true);
         await storage.setOnboardingCompleted(true);

         // Check if user is already authenticated
         const isAuthenticated = await storage.isAuthenticated();

         if (isAuthenticated) {
            router.replace("/(tabs)");
         } else {
            router.replace("/(auth)/register");
         }
      } catch (error) {
         console.error("Error completing onboarding:", error);
         // Still navigate even if storage fails
         router.replace("/(auth)/register");
      } finally {
         setLoading(false);
      }
   }, [router]);

   // Handle button press (Next or Get Started)
   const handleButtonPress = useCallback(() => {
      if (isLastSlide) {
         completeOnboarding();
      } else {
         scrollToNext();
      }
   }, [isLastSlide, completeOnboarding, scrollToNext]);

   // Get button title based on current slide
   const getButtonTitle = useCallback(() => {
      return isLastSlide ? "Get Started" : "Next";
   }, [isLastSlide]);

   return {
      // State
      currentIndex,
      isLastSlide,
      isFirstSlide,
      loading,
      slides: onboardingSlides,

      // Refs
      scrollX,
      slidesRef,
      viewableItemsChanged,
      viewConfig,

      // Functions
      scrollToNext,
      scrollToPrevious,
      skipToEnd,
      completeOnboarding,
      handleButtonPress,
      getButtonTitle,
   };
};
