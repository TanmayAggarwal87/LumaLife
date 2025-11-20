import SegmentedControl, { SegmentOption } from "@/components/topBar";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

import { useHealthData } from "@/lib/health/useHealthData";

const USER_ID = process.env.EXPO_PUBLIC_USER_ID;

const Activity = () => {
  const [selectedTab, setSelectedTab] = useState<SegmentOption>("Daily");
  const { metrics, error, loading } = useHealthData({
    userId: USER_ID,
  });

  const currentData = useMemo(() => {
    return (
      metrics.segments[selectedTab]?.activity ??
      metrics.segments.Daily.activity
    );
  }, [metrics.segments, selectedTab]);

  const stepsPercentage =
    (Number(currentData.steps || 0) / Number(currentData.stepsGoal || 1)) *
    100;

  const cardioPercentage =
    (Number(currentData.cardio || 0) / Number(currentData.cardioGoal || 1)) *
    100;

  return (
    <ScrollView className="h-full w-full bg-slate-900">
      <View className="h-full w-full mb-10">
        <View className="px-2 pb-4 mb-6 ">
          <SegmentedControl selected={selectedTab} onChange={setSelectedTab} />
        </View>
        {error ? (
          <Text className="text-red-400 text-xs px-4">{error}</Text>
        ) : null}
        {loading ? (
          <Text className="text-gray-400 text-xs px-4 mt-1">
            Fetching latest movement data...
          </Text>
        ) : null}
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
                {currentData.steps.toLocaleString()} /{" "}
                {currentData.stepsGoal.toLocaleString()} Steps
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
              data={metrics.heatmap}
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
                <Text className="text-white text-3xl font-bold">
                  {currentData.steps.toLocaleString()}
                </Text>
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
                  {currentData.calories.toLocaleString()}
                  <Text className="text-base text-gray-400">kcal</Text>
                </Text>
              </View>

              {/* Distance */}
              <View className="bg-blue-800/10 rounded-2xl p-4 flex-1 min-w-[45%]">
                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="navigate-outline" size={18} color="#60A5FA" />
                  <Text className="text-gray-400 text-sm">Distance</Text>
                </View>
                <Text className="text-white text-3xl font-bold">
                  {currentData.distance.toFixed(1)}
                  <Text className="text-base text-gray-400">km</Text>
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
              {metrics.workouts.map((workout) => (
                <View
                  key={workout.id}
                  className="bg-blue-800/10 rounded-2xl p-4 flex-row items-center justify-between"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-purple-500/20 rounded-xl items-center justify-center">
                      <Ionicons name="walk" size={20} color="#A78BFA" />
                    </View>
                    <View>
                      <Text className="text-white font-semibold">
                        {workout.title}
                      </Text>
                      <Text className="text-gray-400 text-xs">
                        {workout.subtitle}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-white font-semibold text-sm">
                      {dayjs(workout.startTime).format("h:mm A")}
                    </Text>
                    <Text
                      className={
                        workout.status === "Completed"
                          ? "text-green-400 text-xs"
                          : "text-orange-400 text-xs"
                      }
                    >
                      {workout.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Activity;
