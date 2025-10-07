// src/app/(auth)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="login" />
         <Stack.Screen name="register" />
         {/* <Stack.Screen name="forgot-password" /> */}

         {/* New Screens
         1. Forgotten PAssword
         2. 
         
         */}
      </Stack>
   );
}
