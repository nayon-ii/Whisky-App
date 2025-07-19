import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MapPin, Star, Clock } from "lucide-react-native";
import { Shadow } from "react-native-shadow-2";

interface OfferCardProps {
  id: string;
  title: string;
  description: string;
  type: "cask" | "bottle" | "experience";
  image: string;
  originalPrice: string;
  currentPrice: string;
  location: string;
  rating: number;
  daysLeft: number;
  badge?: string;
  onExpressInterest?: () => void;
  onViewDetails?: () => void;
}

export function OfferCard({
  title,
  description,
  type,
  image,
  originalPrice,
  currentPrice,
  location,
  rating,
  daysLeft,
  badge,
  onExpressInterest,
  onViewDetails,
}: OfferCardProps) {
  const getBadgeColor = () => {
    switch (type) {
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
    switch (type) {
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

  return (
    <Shadow
      distance={8}
      offset={[0, 4]}
      startColor="rgba(0,0,0,0.1)"
      style={{ width: "100%", marginBottom: 16 }}
    >
      <View className="bg-white rounded-xl overflow-hidden">
        {/* Image Section */}
        <View className="relative">
          <Image
            source={{ uri: image }}
            className="w-full h-64"
            resizeMode="cover"
          />
          
          {/* Badge */}
          <View className={`absolute top-4 left-4 ${getBadgeColor()} rounded-full px-3 py-1 flex-row items-center`}>
            <Text className="text-white text-sm font-medium mr-1">
              {getBadgeIcon()}
            </Text>
            <Text className="text-white text-sm font-medium">
              {badge || type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </View>

          {/* Days Left */}
          <View className="absolute bottom-4 left-4 bg-black bg-opacity-60 rounded-full px-3 py-1 flex-row items-center">
            <Clock size={14} color="white" />
            <Text className="text-white text-sm font-medium ml-1">
              {daysLeft} Days left
            </Text>
          </View>
        </View>

        {/* Content Section */}
        <View className="p-4">
          {/* Title and Rating */}
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-lg font-semibold text-gray-800 flex-1 mr-2">
              {title}
            </Text>
            <View className="flex-row items-center">
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text className="text-sm text-gray-600 ml-1">{rating}</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-sm text-gray-600 mb-3 leading-5">
            {description}
          </Text>

          {/* Location */}
          <View className="flex-row items-center mb-4">
            <MapPin size={14} color="#9CA3AF" />
            <Text className="text-sm text-gray-500 ml-1">{location}</Text>
          </View>

          {/* Pricing */}
          <View className="flex-row items-center justify-between mb-4">
            <View>
              {originalPrice !== currentPrice && (
                <Text className="text-sm text-gray-400 line-through">
                  {originalPrice}
                </Text>
              )}
              <Text className="text-xl font-bold text-primary">
                {currentPrice}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={onExpressInterest}
              className="flex-1 bg-primary rounded-lg py-3 items-center"
            >
              <Text className="text-white font-semibold">Express Interest</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onViewDetails}
              className="flex-1 border border-primary rounded-lg py-3 items-center"
            >
              <Text className="text-primary font-semibold">View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Shadow>
  );
}