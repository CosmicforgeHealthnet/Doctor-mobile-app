import { Alert, Text, View } from "react-native";
import { useEffect, useState } from "react";
import "../global.css";
import { Button } from "@/shared/components/Button";
import { Redirect, router } from "expo-router";
import { storage } from "@/core/storage";
import { useAuth } from "@/features/authentication/hooks/useAuth";

export default function HomeScreen() {
   const { isAuthenticated } = useAuth();
   if (isAuthenticated) {
      return <Redirect href="/(tabs)" />;
   }

   return <Redirect href="" />;
}
