// src/app/_layout.tsx
import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "@/shared/hooks/useFonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const { fontsLoaded, fontError } = useFonts();

   useEffect(() => {
      if (fontsLoaded || fontError) {
         SplashScreen.hideAsync();
      }
   }, [fontsLoaded, fontError]);

   if (!fontsLoaded && !fontError) {
      return null;
   }

   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="index" />
         <Stack.Screen name="onboarding" />
         <Stack.Screen name="(auth)" />
         <Stack.Screen name="(tabs)" />
      </Stack>
   );
}
