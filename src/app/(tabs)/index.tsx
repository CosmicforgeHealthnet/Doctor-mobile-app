import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
   return (
      <SafeAreaView className="flex-1 p-4 bg-white">
         <View className="bg-gray-100 flex items-center justify-center p-2 rounded-md h-full">
            <Text className="text-[90px] text-red-500">
               Oops!, You are in a wrong screen, who brought you here?
            </Text>
         </View>
      </SafeAreaView>
   );
}
