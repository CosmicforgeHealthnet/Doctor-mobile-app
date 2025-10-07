// src/app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
   return (
      <Tabs screenOptions={{ headerShown: false }}>
         <Tabs.Screen
            name="index"
            options={{
               title: "Home",
               tabBarLabel: "Home",
            }}
         />
         <Tabs.Screen
            name="appointments"
            options={{
               title: "Appointments",
               tabBarLabel: "Appointments",
            }}
         />
         <Tabs.Screen
            name="messages"
            options={{
               title: "Messages",
               tabBarLabel: "Messages",
            }}
         />
         <Tabs.Screen
            name="notifications"
            options={{
               title: "Notifications",
               tabBarLabel: "Notifications",
            }}
         />
         <Tabs.Screen
            name="profile"
            options={{
               title: "Profile",
               tabBarLabel: "Profile",
            }}
         />
      </Tabs>
   );
}
