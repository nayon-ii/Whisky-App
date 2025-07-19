import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useAppStore } from "@/store/useAppStore";

export default function ExpressInterestSuccessScreen() {
  const router = useRouter();
  const { id, investmentAmount, email, phone } = useLocalSearchParams();
  const { offers } = useAppStore();

  const offer = offers.find((o) => o.id === id);

  if (!offer) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">Offer not found</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          {/* Success Banner */}
          <View className="bg-green-500 rounded-2xl p-8 mb-8 items-center">
            <View className="w-16 h-16 bg-green-400 rounded-full items-center justify-center mb-4">
              <Check size={32} color="white" strokeWidth={3} />
            </View>
            <Text className="text-white text-2xl font-bold mb-2">
              Interest Submitted!
            </Text>
            <Text className="text-white text-center opacity-90">
              We've received your expression of interest
            </Text>
          </View>

          {/* Offer Summary */}
          <View className="bg-orange-50 rounded-xl p-4 mb-8">
            <Text className="text-gray-800 text-xl font-bold mb-2">
              {offer.title}
            </Text>
            <Text className="text-gray-600">
              Investment Amount: <Text className="font-semibold">${investmentAmount}</Text>
            </Text>
          </View>

          {/* Process Steps */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold">1</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-lg font-semibold">
                  Interest Recorded
                </Text>
                <Text className="text-gray-600">
                  Your details have been saved and our team notified.
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold">2</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-lg font-semibold">
                  Expert Review
                </Text>
                <Text className="text-gray-600">
                  Our investment team will review your application.
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-gray-300 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold">3</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 text-lg font-semibold">
                  Personal Contact
                </Text>
                <Text className="text-gray-600">
                  We'll contact you within 24 hours with next steps.
                </Text>
              </View>
            </View>
          </View>

          {/* Contact Information */}
          <View className="mb-8">
            <Text className="text-gray-800 text-xl font-bold mb-4">
              We'll Contact You Via
            </Text>

            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
                <TextInput
                  value={email as string}
                  editable={false}
                  className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-600"
                />
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Phone Number</Text>
                <TextInput
                  value={phone as string}
                  editable={false}
                  className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-600"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}