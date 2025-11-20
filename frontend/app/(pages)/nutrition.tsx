import SegmentedControl, { SegmentOption } from "@/components/topBar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { useHealthData } from "@/lib/health/useHealthData";

export default function Nutrition() {
  const [selectedTab, setSelectedTab] = useState<SegmentOption>("Weekly");
  const { metrics, loading, error } = useHealthData();

  const currentData = useMemo(() => {
    const fallback = metrics.segments.Daily.nutrition;
    return metrics.segments[selectedTab]?.nutrition ?? fallback;
  }, [metrics.segments, selectedTab]);

  const caloriePercentage =
    (Number(currentData.calories || 0) / Number(currentData.goal || 1)) * 100;
  const proteinPercentage =
    (Number(currentData.protein || 0) / Number(currentData.proteinGoal || 1)) *
    100;

  const pieData = [
    {
      value: caloriePercentage,
      color: "#3b82f6",
      gradientCenterColor: "#60a5fa",
    },
    {
      value: 100 - caloriePercentage,
      color: "#1e293b",
    },
  ];

  return (
    <View className="h-full w-full  bg-slate-900">
      <ScrollView className="h-full w-full px-5 mb-5 pt-2">
        {/* Tab Navigation */}
        <View className="px-2 pb-4">
          <SegmentedControl selected={selectedTab} onChange={setSelectedTab} />
        </View>
        {error ? (
          <Text className="text-red-400 text-xs px-2">{error}</Text>
        ) : null}
        {loading ? (
          <Text className="text-gray-400 text-xs px-2 mb-2">
            Updating nutrition averages...
          </Text>
        ) : null}

        {/* Calories Section */}
        <View className="items-center mb-2">
          <Text className="text-gray-400 text-md mb-1">Avg Calories/Day</Text>
          <Text className="text-white text-5xl font-bold mb-8">
            {currentData.calories.toLocaleString()}
          </Text>
        </View>

        {/* Circular Progress Chart */}
        <View className="items-center mb-8 relative">
          <PieChart
            curvedEndEdges={true}
            curvedStartEdges={true}
            edgesRadius={9999}
            data={pieData}
            donut
            radius={100}
            innerRadius={72}
            innerCircleColor="#0f172a"
            strokeWidth={5}
            tooltipBorderRadius={9999}
            strokeColor="#0f172a"
            centerLabelComponent={() => (
              <View className="items-center">
                <Text className="text-white text-3xl font-bold">
                  of {currentData.goal.toLocaleString()}
                </Text>
                <Text className="text-gray-400 text-md">Kcal Goal</Text>
              </View>
            )}
          />
        </View>

        {/* Your Goals Section */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-xl font-semibold">Your Goals</Text>
          <TouchableOpacity className="flex-row items-center bg-blue-800/10 p-2 rounded-full ">
            <Ionicons name="create-outline" size={20} color="#3b82f6" />
            <Text className="text-blue-500 text-md ml-1">Edit Goals</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Calories */}
        <View className="mb-4 bg-blue-800/10 rounded-3xl p-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-white text-base">Daily Calories</Text>
            <Text className="text-gray-400 text-sm">
              {currentData.calories} / {currentData.goal.toLocaleString()} kcal
            </Text>
          </View>
          <View className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <LinearGradient
              colors={["#3b82f6", "#8b5cf6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: `${Math.min(caloriePercentage, 100)}%`,
                height: "100%",
                borderRadius: 9999,
              }}
            />
          </View>
        </View>

        {/* Daily Protein */}
        <View className="mb-6  bg-blue-800/10 rounded-3xl p-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-white text-base">Daily Protein</Text>
            <Text className="text-gray-400 text-sm">
              {currentData.protein}g / {currentData.proteinGoal}g
            </Text>
          </View>
          <View className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <LinearGradient
              colors={["#8b5cf6", "#ec4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: `${Math.min(proteinPercentage, 100)}%`,
                height: "100%",
                borderRadius: 9999,
              }}
            />
          </View>
        </View>

        {/* Macronutrients Section */}
        <Text className="text-white text-xl font-semibold mb-4">
          Macronutrients
        </Text>
        <View className="flex-row justify-between mb-6">
          <View className="flex-1 bg-blue-800/10 rounded-2xl p-4 mr-2">
            <Text className="text-gray-400 text-xs mb-1">Carbs</Text>
            <Text className="text-white text-2xl font-bold">212g</Text>
          </View>
          <View className="flex-1 bg-blue-800/10 rounded-2xl p-4 mx-1">
            <Text className="text-gray-400 text-xs mb-1">Protein</Text>
            <Text className="text-white text-2xl font-bold">145g</Text>
          </View>
          <View className="flex-1 bg-blue-800/10 rounded-2xl p-4 ml-2">
            <Text className="text-gray-400 text-xs mb-1">Fats</Text>
            <Text className="text-white text-2xl font-bold">60g</Text>
          </View>
        </View>

        {/* Micronutrient Highlights */}
        <Text className="text-white text-xl font-semibold mb-4">
          Micronutrient Highlights
        </Text>

        {/* Iron */}
        <View className="bg-blue-800/10 rounded-2xl p-4 mb-3 flex-row items-center">
          <View className="w-10 h-10 bg-orange-500/20 rounded-full items-center justify-center mr-3">
            <Ionicons name="fitness" size={20} color="#f97316" />
          </View>
          <View className="flex-1">
            <Text className="text-white text-base font-medium">Iron</Text>
            <Text className="text-gray-400 text-xs">Avg: 8mg / 18mg</Text>
          </View>
          <Text className="text-green-500 text-sm font-medium">On Track</Text>
        </View>

        {/* Vitamin D */}
        <View className="bg-blue-800/10 rounded-2xl p-4 mb-3 flex-row items-center">
          <View className="w-10 h-10 bg-yellow-500/20 rounded-full items-center justify-center mr-3">
            <Ionicons name="sunny" size={20} color="#eab308" />
          </View>
          <View className="flex-1">
            <Text className="text-white text-base font-medium">Vitamin D</Text>
            <Text className="text-gray-400 text-xs">Avg: 4.5μg / 10μg</Text>
          </View>
          <Text className="text-yellow-500 text-sm font-medium">
            Needs Improvement
          </Text>
        </View>

        {/* Hydration */}
        <View className="bg-blue-800/10 rounded-2xl p-4 mb-8 flex-row items-center">
          <View className="w-10 h-10 bg-cyan-500/20 rounded-full items-center justify-center mr-3">
            <Ionicons name="water" size={20} color="#06b6d4" />
          </View>
          <View className="flex-1">
            <Text className="text-white text-base font-medium">Hydration</Text>
            <Text className="text-gray-400 text-xs">Avg: 2.8L / 3L</Text>
          </View>
          <Text className="text-green-500 text-sm font-medium">On Track</Text>
        </View>
      </ScrollView>
    </View>
  );
}
