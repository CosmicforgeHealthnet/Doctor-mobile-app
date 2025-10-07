import { Alert, Text, View } from "react-native";
import { useEffect, useState } from "react";
import "../global.css";
import { Button } from "@/shared/components/Button";
import { router } from "expo-router";

export default function HomeScreen() {
   const isOnboardingDone = false;

   useEffect(() => {
      if (!isOnboardingDone) {
         router.push("/onboarding");
      }
   }, [isOnboardingDone]);
   return (
      <View className="p-4">
         <Text className="bg-red-500">This is the Home Page</Text>
         <Button
            title="Click Me Please Baby"
            onPress={() => Alert.alert("Howdy!, you finally clicked me")}
         />
      </View>
   );
}
