import SegmentedControl, { SegmentOption } from "@/components/topBar";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const activity = () => {
  const [selectedTab, setSelectedTab] = useState<SegmentOption>("Daily");

  // Hardcoded data for different tabs
  const data = {
    Daily: { steps: 10240, stepsGoal: 12000, cardio: 30, cardioGoal: 30 },
    Weekly: { steps: 68400, stepsGoal: 84000, cardio: 185, cardioGoal: 210 },
    Monthly: { steps: 295000, stepsGoal: 360000, cardio: 820, cardioGoal: 900 },
  };
  const heatmapData = [

    { value: 55 },
    { value: 70 },
    { value: 85 },
    { value: 95 },
    { value: 80 },
    { value: 65 },
    { value: 50 },
    { value: 45 },
    { value: 70 },
    { value: 90 },
  ];

  const currentData = data[selectedTab];

  const stepsPercentage =
    (Number(currentData.steps) / Number(currentData.stepsGoal)) * 100;

  const cardioPercentage =
    (Number(currentData.cardio) / Number(currentData.cardioGoal)) * 100;
  const maxValue = Math.max(...heatmapData.map((d) => d.value));

  return (
    <ScrollView className="h-full w-full bg-slate-900">
      <View className="h-full w-full mb-10">
        <View className="px-2 pb-4 mb-6 ">
          <SegmentedControl selected={selectedTab} onChange={setSelectedTab} />
        </View>
        <View className="flex justify-center items-start flex-col gap-3 w-full px-2 py-3 bg-blue-800/10 mx-3 rounded-xl">
          {/* title  */}
          <View className="flex-row w-full justify-between items-center mb-4">
            <Text className="text-white text-xl font-semibold">
              Daily Goals
            </Text>
            <TouchableOpacity className="flex-row items-center bg-blue-800/10 p-2 rounded-full ">
              <Ionicons name="create-outline" size={20} color="#3b82f6" />
              <Text className="text-blue-500 text-md ml-1">Edit Goals</Text>
            </TouchableOpacity>
          </View>

          {/* Daily steps */}
          <View className="mb-4 w-full px-2 rounded-3xl">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400 text-base">Walk 12,000 steps</Text>
              <Text className="text-gray-200 text-md">
                {currentData.steps} / {currentData.stepsGoal.toLocaleString()}{" "}
                Steps
              </Text>
            </View>
            <View className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <LinearGradient
                colors={["#1e3a8a", "#1d4ed8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: `${Math.min(stepsPercentage, 100)}%`,
                  height: "100%",
                  borderRadius: 9999,
                }}
              />
            </View>
          </View>

          {/* Daily cardio */}
          <View className="mb-6 w-full px-2 rounded-3xl">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400 text-base">Active Minutes</Text>
              <Text className="text-gray-200 text-md">
                {currentData.cardio} min/ {currentData.cardioGoal} min
              </Text>
            </View>
            <View className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <LinearGradient
                colors={["#1e3a8a", "#1d4ed8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: `${Math.min(cardioPercentage, 100)}%`,
                  height: "100%",
                  borderRadius: 9999,
                }}
              />
            </View>
          </View>
        </View>

        <View className="gap-6 mt-6 mx-2">
          {/* Heatmap Card */}
          <View className="bg-blue-800/10 rounded-2xl p-4">
            <Text className="text-white text-xl font-semibold mb-1">
              {selectedTab} Heatmap
            </Text>
            <Text className="text-gray-400 text-md mb-4">Intensity Zones</Text>

            {/* Bar Chart */}
            <BarChart
              data={heatmapData}
              barWidth={20}
              noOfSections={4}
              barBorderRadius={6}
              frontColor="#1d4ed8"
              yAxisThickness={0}
              xAxisThickness={0}
              hideRules
              hideYAxisText
              spacing={9}
              height={160}
              showGradient
              gradientColor="#1e3a9b"
            />
          </View>

          {/* Today's Metrics */}
          <View className="mx-2">
            <Text className="text-white text-lg font-semibold mb-3">
              {selectedTab}'s Metrics
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {/* Steps */}
              <View className="bg-blue-800/10 rounded-2xl p-4 flex-1 min-w-[45%]">
                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="walk" size={18} color="#60A5FA" />
                  <Text className="text-gray-400 text-sm">Steps</Text>
                </View>
                <Text className="text-white text-3xl font-bold">{currentData.steps}</Text>
              </View>

              {/* Active Minutes */}
              <View className="bg-blue-800/10 rounded-2xl p-4 flex-1 min-w-[45%]">
                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="time-outline" size={18} color="#60A5FA" />
                  <Text className="text-gray-400 text-sm">Active Mins</Text>
                </View>
                <Text className="text-white text-3xl font-bold">
                  {currentData.cardio}<Text className="text-base text-gray-400">min</Text>
                </Text>
              </View>

              {/* Calories */}
              <View className="bg-blue-800/10 rounded-2xl p-4 flex-1 min-w-[45%]">
                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="flame-outline" size={18} color="#60A5FA" />
                  <Text className="text-gray-400 text-sm">Calories</Text>
                </View>
                <Text className="text-white text-3xl font-bold">
                  320<Text className="text-base text-gray-400">kcal</Text>
                </Text>
              </View>

              {/* Distance */}
              <View className="bg-blue-800/10 rounded-2xl p-4 flex-1 min-w-[45%]">
                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="navigate-outline" size={18} color="#60A5FA" />
                  <Text className="text-gray-400 text-sm">Distance</Text>
                </View>
                <Text className="text-white text-3xl font-bold">
                  7.8<Text className="text-base text-gray-400">km</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Workouts */}
          <View>
            <Text className="text-white text-lg font-semibold mb-3">
              Workouts
            </Text>

            <View className="gap-3">
              {/* Morning Run */}
              <View className="bg-blue-800/10 rounded-2xl p-4 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-purple-500/20 rounded-xl items-center justify-center">
                    <Ionicons name="walk" size={20} color="#A78BFA" />
                  </View>
                  <View>
                    <Text className="text-white font-semibold">
                      Morning Run
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      30 min • 5.2 km
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-white font-semibold text-sm">
                    8:15 AM
                  </Text>
                  <Text className="text-green-400 text-xs">Completed</Text>
                </View>
              </View>

              {/* Gym Session */}
              <View className="bg-blue-800/10 rounded-2xl p-4 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-purple-500/20 rounded-xl items-center justify-center">
                    <Ionicons name="barbell" size={20} color="#A78BFA" />
                  </View>
                  <View>
                    <Text className="text-white font-semibold">
                      Gym Session
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      45 min • Weight Training
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-white font-semibold text-sm">
                    6:30 PM
                  </Text>
                  <Text className="text-orange-400 text-xs">Upcoming</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default activity;
