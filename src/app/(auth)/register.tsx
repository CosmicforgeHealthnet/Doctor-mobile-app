// src/app/(auth)/signup.tsx
import React from "react";
import {
   View,
   Text,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
   TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { SafeAreaView } from "react-native-safe-area-context";
import { medicalSpecialties, useSignup } from "@/features/authentication";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { Dropdown } from "@/shared/components/Dropdown";

function RegisterScreen() {
   const {
      formData,
      errors,
      loading,
      showPassword,
      showConfirmPassword,
      updateField,
      setShowPassword,
      setShowConfirmPassword,
      handleSignup,
      navigateToLogin,
   } = useSignup();

   return (
      <SafeAreaView className="flex-1 bg-background">
         {/* Background Gradient Pattern */}
         <View className="absolute top-0 left-0 right-0 h-64 overflow-hidden">
            <LinearGradient
               colors={["rgba(255, 182, 193, 0.3)", "rgba(255, 240, 245, 0.1)"]}
               className="flex-1"
            >
               {/* Vertical stripes pattern */}
               <View className="flex-row h-full opacity-30">
                  {Array.from({ length: 12 }).map((_, i) => (
                     <View
                        key={i}
                        className={`flex-1 ${i % 2 === 0 ? "bg-white" : "bg-transparent"}`}
                     />
                  ))}
               </View>
            </LinearGradient>
         </View>

         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
         >
            <ScrollView
               className="flex-1"
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled"
               contentContainerStyle={{ paddingBottom: 40 }}
            >
               <View className="px-xl pt-xl">
                  {/* Header */}
                  <View className="mb-2xl">
                     <Text className="text-4xl font-poppins-bold text-text mb-xs">Welcome!</Text>
                     <Text className="text-base font-supreme text-textSecondary">
                        Let's get you all set up so you can access your personal account.
                     </Text>
                  </View>

                  {/* Form */}
                  <View>
                     {/* Full Name */}
                     <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChangeText={(text) => updateField("fullName", text)}
                        error={errors.fullName}
                        autoCapitalize="words"
                        editable={!loading}
                     />

                     {/* Email */}
                     <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChangeText={(text) => updateField("email", text.toLowerCase())}
                        error={errors.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!loading}
                     />

                     {/* Department */}
                     <Dropdown
                        label="Department (If applicable)"
                        placeholder="Select Department"
                        value={formData.department}
                        options={medicalSpecialties}
                        onSelect={(value) => updateField("department", value)}
                        error={errors.department}
                        disabled={loading}
                     />

                     {/* Password */}
                     <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChangeText={(text) => updateField("password", text)}
                        error={errors.password}
                        secureTextEntry={!showPassword}
                        rightIcon={<Text className="text-base">{showPassword ? "👁️" : "👁️‍🗨️"}</Text>}
                        onRightIconPress={() => setShowPassword(!showPassword)}
                        editable={!loading}
                     />

                     {/* Confirm Password */}
                     <Input
                        label="Confirm Password"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChangeText={(text) => updateField("confirmPassword", text)}
                        error={errors.confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        rightIcon={
                           <Text className="text-base">{showConfirmPassword ? "👁️" : "👁️‍🗨️"}</Text>
                        }
                        onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        editable={!loading}
                     />

                     {/* Terms and Conditions */}
                     {/* <Checkbox
                        checked={formData.agreeToTerms}
                        onChange={(checked) => updateField("agreeToTerms", checked)}
                        label={
                           <Text className="text-sm font-supreme text-textSecondary">
                              I Agree with{" "}
                              <Text className="text-primary font-supreme-semibold">
                                 Terms of Service
                              </Text>{" "}
                              and{" "}
                              <Text className="text-primary font-supreme-semibold">
                                 Privacy Policy
                              </Text>
                           </Text>
                        }
                        error={errors.agreeToTerms}
                        disabled={loading}
                     /> */}

                     {/* Signup Button */}
                     <Button
                        title={loading ? "Creating Account..." : "Sign Up"}
                        onPress={handleSignup}
                        disabled={loading}
                        className="mt-md"
                     />

                     {/* Login Link */}
                     <View className="flex-row justify-center items-center mt-lg mb-lg">
                        <Text className="text-sm font-supreme text-textSecondary">
                           Already have an account?{" "}
                        </Text>
                        <TouchableOpacity
                           onPress={navigateToLogin}
                           disabled={loading}
                        >
                           <Text className="text-sm font-supreme-semibold text-primary">
                              Sign In
                           </Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}

export default RegisterScreen;
