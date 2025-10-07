// src/app/(auth)/login.tsx
import React, { useEffect } from "react";
import {
   View,
   Text,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
   TouchableOpacity,
   Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLogin } from "@/features/authentication/hooks/useLogin";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@/shared/components/Input";

function LoginScreen() {
   const {
      formData,
      errors,
      loading,
      showPassword,
      updateField,
      setShowPassword,
      handleLogin,
      navigateToSignup,
      navigateToForgotPassword,
      loadRememberedEmail,
   } = useLogin();

   useEffect(() => {
      loadRememberedEmail();
   }, []);

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
               contentContainerStyle={{ flexGrow: 1 }}
            >
               <View className="flex-1 px-xl pt-xl justify-center">
                  {/* Logo/Icon (Optional) */}
                  <View className="items-center mb-xl">
                     <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-md">
                        <Text className="text-4xl">🏥</Text>
                     </View>
                  </View>

                  {/* Header */}
                  <View className="mb-2xl">
                     <Text className="text-4xl font-poppins-bold text-text mb-xs">
                        Welcome Back!
                     </Text>
                     <Text className="text-base font-supreme text-textSecondary">
                        Sign in to continue to your account
                     </Text>
                  </View>

                  {/* Form */}
                  <View>
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

                     {/* Remember Me & Forgot Password Row */}
                     <View className="flex-row justify-between items-center mb-lg">
                        <Checkbox
                           checked={formData.rememberMe}
                           onChange={(checked) => updateField("rememberMe", checked)}
                           label="Remember Me"
                           disabled={loading}
                           className="mb-0"
                        />

                        <TouchableOpacity
                           onPress={navigateToForgotPassword}
                           disabled={loading}
                        >
                           <Text className="text-sm font-supreme-semibold text-primary">
                              Forgot Password?
                           </Text>
                        </TouchableOpacity>
                     </View>

                     {/* Login Button */}
                     <Button
                        title={loading ? "Signing In..." : "Sign In"}
                        onPress={handleLogin}
                        disabled={loading}
                     />

                     {/* Divider */}
                     <View className="flex-row items-center my-xl">
                        <View className="flex-1 h-px bg-border" />
                        <Text className="mx-md text-sm font-supreme text-textSecondary">OR</Text>
                        <View className="flex-1 h-px bg-border" />
                     </View>

                     {/* Social Login Buttons (Optional) */}
                     <View className="flex-row gap-md mb-lg">
                        <TouchableOpacity
                           className="flex-1 flex-row items-center justify-center py-md border border-borderLight rounded-xl bg-surface"
                           disabled={loading}
                        >
                           <Text className="text-2xl mr-sm">👤</Text>
                           <Text className="text-sm font-supreme-medium text-text">Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                           className="flex-1 flex-row items-center justify-center py-md border border-borderLight rounded-xl bg-surface"
                           disabled={loading}
                        >
                           <Text className="text-2xl mr-sm">📘</Text>
                           <Text className="text-sm font-supreme-medium text-text">Facebook</Text>
                        </TouchableOpacity>
                     </View>

                     {/* Signup Link */}
                     <View className="flex-row justify-center items-center mt-lg mb-lg">
                        <Text className="text-sm font-supreme text-textSecondary">
                           Don't have an account?{" "}
                        </Text>
                        <TouchableOpacity
                           onPress={navigateToSignup}
                           disabled={loading}
                        >
                           <Text className="text-sm font-supreme-semibold text-primary">
                              Sign Up
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

export default LoginScreen;
