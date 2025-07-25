import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ListFilter as Filter } from "lucide-react-native";
import { useAppStore } from "@/store/useAppStore";
import { SearchInput } from "@/components/shared/SearchInput";
import { FilterChip } from "@/components/shared/FilterChip";
import { OfferCard } from "@/components/shared/OfferCard";
import { StatsCard } from "@/components/shared/StatsCard";
import { showToast } from "@/utils/toast";

export default function OffersScreen() {
  const { offers } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Cask", "Bottle", "Experience"];

  // Filter offers based on search and active filter
  const filteredOffers = offers.filter((offer) => {
    const matchesSearch = offer.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || 
      offer.type.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const availableCount = filteredOffers.length;
  const avgGrowth = "+120%";
  const avgPrice = "$20K";

  const handleExpressInterest = (offerId: string) => {
    router.push(`/(screen)/express-interest/${offerId}` as any);
  };

  const handleViewDetails = (offerId: string) => {
    router.push(`/(screen)/offer-details/${offerId}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4">
          {/* Header */}
          <Text className="text-gray-800 text-2xl font-semibold mb-6">
            Offers
          </Text>

          {/* Search */}
          <SearchInput
            placeholder="Search your casks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="mb-4"
          />

          {/* Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            <View className="flex-row space-x-3">
              {filters.map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  active={activeFilter === filter}
                  onPress={() => setActiveFilter(filter)}
                />
              ))}
            </View>
          </ScrollView>

          {/* Stats Cards */}
          <View className="flex-row space-x-3 mb-6">
            <StatsCard
              value={availableCount.toString()}
              label="Available"
              backgroundColor="bg-orange-50"
              borderColor="border-orange-200"
              valueColor="text-orange-600"
            />
            <StatsCard
              value={avgGrowth}
              label="Avg Growth"
              backgroundColor="bg-green-50"
              borderColor="border-green-200"
              valueColor="text-green-600"
            />
            <StatsCard
              value={avgPrice}
              label="Avg Price"
              backgroundColor="bg-red-50"
              borderColor="border-red-200"
              valueColor="text-red-600"
            />
          </View>

          {/* Offers List */}
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                {...offer}
                onExpressInterest={() => handleExpressInterest(offer.id)}
                onViewDetails={() => handleViewDetails(offer.id)}
              />
            ))
          ) : (
            <View className="items-center justify-center py-12 px-4">
              <Filter size={48} color="#9CA3AF" />
              <Text className="text-gray-500 text-lg font-medium mt-4 text-center">
                No Offers Found
              </Text>
              <Text className="text-gray-400 text-sm mt-2 text-center">
                {searchQuery
                  ? `No offers match your search "${searchQuery}"`
                  : activeFilter !== "All"
                    ? `No ${activeFilter.toLowerCase()} offers available`
                    : "No offers available at the moment"}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}