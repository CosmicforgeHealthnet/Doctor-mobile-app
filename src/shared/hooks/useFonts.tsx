// src/shared/hooks/useFonts.ts
import { useFonts as useExpoFonts } from "expo-font";
import {
   Poppins_300Light,
   Poppins_400Regular,
   Poppins_500Medium,
   Poppins_600SemiBold,
   Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export const useFonts = () => {
   const [fontsLoaded, fontError] = useExpoFonts({
      // Google Fonts - Poppins
      "Poppins-Light": Poppins_300Light,
      "Poppins-Regular": Poppins_400Regular,
      "Poppins-Medium": Poppins_500Medium,
      "Poppins-SemiBold": Poppins_600SemiBold,
      "Poppins-Bold": Poppins_700Bold,

      // Custom Font - Supreme
      "Supreme-Light": require("../../../assets/fonts/Supreme-Light.ttf"),
      "Supreme-Regular": require("../../../assets/fonts/Supreme-Regular.ttf"),
      "Supreme-Medium": require("../../../assets/fonts/Supreme-Medium.ttf"),
      "Supreme-ExtraBold": require("../../../assets/fonts/Supreme-Extrabold.ttf"),
      "Supreme-Bold": require("../../../assets/fonts/Supreme-Bold.ttf"),
   });

   console.log(fontsLoaded, "font loaded");

   return { fontsLoaded, fontError };
};
