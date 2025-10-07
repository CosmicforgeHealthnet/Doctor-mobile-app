import { ImageSourcePropType } from "react-native";

export interface OnboardingSlideData {
   id: string;
   image: ImageSourcePropType;
   title: string;
   titleHighlight?: string; // Word to highlight in different color
   description: string;
}

export const onboardingSlides: OnboardingSlideData[] = [
   {
      id: "1",
      image: require("../../../../assets/images/onboarding/slide1.png"),
      title: "Remote Consultations",
      titleHighlight: "Remote",
      description:
         "Connect with healthcare professionals from the comfort of your home through secure video calls.",
   },
   {
      id: "2",
      image: require("../../../../assets/images/onboarding/slide2.png"),
      title: "Flexible Hours",
      titleHighlight: "Flexible",
      description: "Book appointments that fit your schedule. Available 24/7 for your convenience.",
   },
];
