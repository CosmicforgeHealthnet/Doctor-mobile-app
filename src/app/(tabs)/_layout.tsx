// src/app/(tabs)/_layout.tsx
import { Tabs as BottomNavigation } from "expo-router";
import { View } from "react-native";
import {
   AlertCircle,
   AlertTriangle,
   Bell,
   Clock,
   MessageCircle,
   MessageCircleCodeIcon,
   Package,
   PlusCircle,
   User,
} from "lucide-react-native";
import { Colors } from "@/shared/constants/Color";

export default function TabLayout() {
   return (
      <BottomNavigation
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: "#000000",
            tabBarStyle: {
               paddingTop: 10,
               height: 120,
               backgroundColor: Colors.background,
               borderTopWidth: 0,
            },
            tabBarLabelStyle: { fontFamily: "Poppins-Regular", fontSize: 13 },
         }}
      >
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
               tabBarIcon: ({ color, size }) => (
                  <MessageCircle
                     color={color}
                     size={size}
                  />
               ),
            }}
         />
         <BottomNavigation.Screen
            name="notifications"
            options={{
               title: "Notifications",
               tabBarLabel: "Notifications",
               tabBarIcon: ({ color, size }) => (
                  <Bell
                     color={color}
                     size={size}
                  />
               ),
            }}
         />
         <BottomNavigation.Screen
            name="profile"
            options={{
               title: "Profile",
               tabBarLabel: "Profile",
               tabBarIcon: ({ color, size }) => (
                  <User
                     color={color}
                     size={size}
                  />
               ),
            }}
         />
      </BottomNavigation>
   );
}
