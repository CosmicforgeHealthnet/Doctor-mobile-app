// src/app/(tabs)/_layout.tsx
import { Tabs as BottomNavigation } from "expo-router";
import { View } from "react-native";
import { Clock, Package, PlusCircle, User } from "lucide-react-native";

export default function TabLayout() {
   return (
      <BottomNavigation screenOptions={{ headerShown: false }}>
         <BottomNavigation.Screen
            name="index"
            options={{
               title: "Home",
               tabBarIcon: ({ color, size }) => (
                  <Package
                     color={color}
                     size={size}
                  />
               ),
            }}
         />
         <BottomNavigation.Screen
            name="appointments"
            options={{
               title: "Appointments",
               tabBarLabel: "Appointments",
            }}
         />
         <BottomNavigation.Screen
            name="messages"
            options={{
               title: "Messages",
               tabBarLabel: "Messages",
            }}
         />
         <BottomNavigation.Screen
            name="notifications"
            options={{
               title: "Notifications",
               tabBarLabel: "Notifications",
            }}
         />
         <BottomNavigation.Screen
            name="profile"
            options={{
               title: "Profile",
               tabBarLabel: "Profile",
            }}
         />
      </BottomNavigation>
   );
}
