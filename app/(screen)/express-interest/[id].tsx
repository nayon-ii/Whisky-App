import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MapPin, Star, Clock, User, CreditCard, Mail, Phone } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppStore } from "@/store/useAppStore";
import { Shadow } from "react-native-shadow-2";
import { showToast } from "@/utils/toast";

const expressInterestSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  investmentAmount: z.string().min(1, "Investment amount is required"),
  preferredContactMethod: z.enum(["email", "phone"]),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type ExpressInterestFormData = z.infer<typeof expressInterestSchema>;

export default function ExpressInterestScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { offers, user } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  const offer = offers.find((o) => o.id === id);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ExpressInterestFormData>({
    resolver: zodResolver(expressInterestSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phoneNumber: "",
      investmentAmount: "",
      preferredContactMethod: "email",
      agreeToTerms: false,
    },
  });

  const preferredContactMethod = watch("preferredContactMethod");
  const agreeToTerms = watch("agreeToTerms");

  if (!offer) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">Offer not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getBadgeColor = () => {
    switch (offer.type) {
      case "cask":
        return "bg-primary";
      case "bottle":
        return "bg-primary";
      case "experience":
        return "bg-primary";
      default:
        return "bg-primary";
    }
  };

  const getBadgeIcon = () => {
    switch (offer.type) {
      case "cask":
        return "🛢️";
      case "bottle":
        return "🍾";
      case "experience":
        return "🥃";
      default:
        return "🛢️";
    }
  };

  const onSubmit = async (data: ExpressInterestFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to success page with form data
      router.push({
        pathname: "/(screen)/express-interest-success/[id]" as any,
        params: {
          id: offer.id,
          investmentAmount: data.investmentAmount,
          email: data.email,
          phone: data.phoneNumber,
        },
      });
    } catch (error) {
      console.error("Express interest error:", error);
      showToast("error", "Failed to submit", "Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-5 py-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-gray-800 text-xl font-medium">
            Express Interest
          </Text>
        </View>

        <View className="px-5 pb-4">
          {/* Offer Image */}
          <Shadow
            distance={8}
            offset={[0, 4]}
            startColor="rgba(0,0,0,0.1)"
            style={{ width: "100%", marginBottom: 24 }}
          >
            <View className="relative rounded-xl overflow-hidden">
              <Image
                source={{ uri: offer.image }}
                className="w-full h-64"
                resizeMode="cover"
              />
              
              {/* Badge */}
              <View className={`absolute top-4 left-4 ${getBadgeColor()} rounded-full px-3 py-1 flex-row items-center`}>
                <Text className="text-white text-sm font-medium mr-1">
                  {getBadgeIcon()}
                </Text>
                <Text className="text-white text-sm font-medium">
                  {offer.badge || offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </Text>
              </View>

              {/* Days Left */}
              <View className="absolute bottom-4 left-4 bg-black bg-opacity-60 rounded-full px-3 py-1 flex-row items-center">
                <Clock size={14} color="white" />
                <Text className="text-white text-sm font-medium ml-1">
                  {offer.daysLeft} Days left
                </Text>
              </View>
            </View>
          </Shadow>

          {/* Offer Info */}
          <View className="flex-row items-center mb-6">
            <MapPin size={16} color="#9CA3AF" />
            <Text className="text-gray-500 ml-1 mr-4">{offer.location}</Text>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text className="text-gray-600 ml-1">{offer.rating}</Text>
          </View>

          <Text className="text-2xl font-bold text-gray-800 mb-6">
            {offer.title}
          </Text>

          {/* Personal Information Section */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <User size={20} color="#374151" />
              <Text className="text-gray-800 text-lg font-semibold ml-2">
                Personal Information
              </Text>
            </View>

            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="James Wilson"
                      className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                    />
                  )}
                />
                {errors.fullName && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="james@gmail.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                    />
                  )}
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Phone Number</Text>
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="James Wilson"
                      keyboardType="phone-pad"
                      className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber.message}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Investment Details Section */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <CreditCard size={20} color="#374151" />
              <Text className="text-gray-800 text-lg font-semibold ml-2">
                Investment Details
              </Text>
            </View>

            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 font-medium mb-2">Investment Amount</Text>
                <Controller
                  control={control}
                  name="investmentAmount"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Enter amount"
                      keyboardType="numeric"
                      className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                    />
                  )}
                />
                {errors.investmentAmount && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.investmentAmount.message}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-3">Preferred Contact Method</Text>
                <View className="flex-row space-x-3">
                  <Controller
                    control={control}
                    name="preferredContactMethod"
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TouchableOpacity
                          onPress={() => onChange("email")}
                          className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg border ${
                            value === "email"
                              ? "bg-primary border-primary"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <Mail size={18} color={value === "email" ? "white" : "#374151"} />
                          <Text
                            className={`ml-2 font-medium ${
                              value === "email" ? "text-white" : "text-gray-700"
                            }`}
                          >
                            Email
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => onChange("phone")}
                          className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg border ${
                            value === "phone"
                              ? "bg-primary border-primary"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <Phone size={18} color={value === "phone" ? "white" : "#374151"} />
                          <Text
                            className={`ml-2 font-medium ${
                              value === "phone" ? "text-white" : "text-gray-700"
                            }`}
                          >
                            Phone
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View className="mb-8">
            <Controller
              control={control}
              name="agreeToTerms"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  onPress={() => onChange(!value)}
                  className="flex-row items-start"
                >
                  <View
                    className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                      value
                        ? "bg-primary border-primary"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {value && (
                      <Text className="text-white text-xs">✓</Text>
                    )}
                  </View>
                  <Text className="text-gray-600 flex-1 leading-5">
                    I agree to the{" "}
                    <Text className="text-primary font-medium">Terms & Conditions</Text>
                    {" "}and{" "}
                    <Text className="text-primary font-medium">Privacy Policy</Text>.
                  </Text>
                </TouchableOpacity>
              )}
            />
            {errors.agreeToTerms && (
              <Text className="text-red-500 text-sm mt-2">
                {errors.agreeToTerms.message}
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={!agreeToTerms || isLoading}
            className={`rounded-xl py-4 items-center ${
              agreeToTerms && !isLoading
                ? "bg-primary"
                : "bg-gray-300"
            }`}
          >
            <Text className="text-white text-lg font-semibold">
              {isLoading ? "Submitting..." : "Submit Expression of Interest"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}