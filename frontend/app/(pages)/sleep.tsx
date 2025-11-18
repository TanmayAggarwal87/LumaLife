import SegmentedControl, { SegmentOption } from "@/components/topBar";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function sleep() {
  const [selectedTab, setSelectedTab] = useState<SegmentOption>("Daily");

  // Hardcoded data for different tabs
  const data = {
    Daily: {
      sleepScore: 82,
      totalSleep: "7 h 35 m",
      deepSleep: "1 h 45 m",
      lightSleep: "4 h 10 m",
      remSleep: "1 h 40 m",
    },
    Weekly: {
      sleepScore: 78,
      totalSleep: "52 h 15 m",
      deepSleep: "11 h 20 m",
      lightSleep: "30 h 45 m",
      remSleep: "10 h 10 m",
    },
    Monthly: {
      sleepScore: 80,
      totalSleep: "215 h 30 m",
      deepSleep: "50 h 10 m",
      lightSleep: "125 h 40 m",
      remSleep: "39 h 40 m",
    },
  };

  const currentData = data[selectedTab];
  const parseTime = (str: any) => {
    const [hr, min] = str.match(/\d+/g).map(Number);
    return hr * 60 + (min || 0);
  };

  const deep = parseTime(currentData.deepSleep);
  const light = parseTime(currentData.lightSleep);
  const rem = parseTime(currentData.remSleep);
  const total = deep + light + rem;

  const deepWidth = (deep / total) * 100;
  const lightWidth = (light / total) * 100;
  const remWidth = (rem / total) * 100;

  return (
    <View className="h-full w-full  bg-slate-900 ">
      <ScrollView className="h-full w-full px-5 pt-2">
        {/* Tab Navigation */}
        <View className="px-2 pb-4">
                  <SegmentedControl
                  selected={selectedTab}
                  onChange={setSelectedTab}
                />
                </View>

        {/* Sleep Section */}
        <View className="flex justify-center items-center">
          <Text className="text-lg text-gray-400">Total Sleep Time</Text>
          <Text className="text-white text-4xl font-bold mt-1">
            {currentData.totalSleep}
          </Text>
        </View>

        <View className="bg-blue-800/20 rounded-2xl px-2 mt-10">
          <View className="flex justify-between items-center flex-row px-2 py-4">
            <Text className="text-xl text-gray-300 font-bold">Sleep Score</Text>
            <Text className="text-xl text-blue-600 font-bold">
              <Text className="text-3xl">{currentData.sleepScore}</Text>/100
            </Text>
          </View>
          <View className="w-full mb-6 mt-2 bg-gray-700 rounded-xl h-4 overflow-hidden">
            <LinearGradient
              colors={["#1e3a8a", "#1d4ed8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="h-4 rounded-full"
              style={{
                width: `${currentData.sleepScore}%`,
                borderRadius: 9999,
              }}
            />
          </View>
        </View>

        <View>
          <Text className="text-2xl text-white font-bold mt-6 mb-3">
            {" "}
            Sleep Cycles
          </Text>

          <View className="w-full p-4 rounded-2xl bg-blue-800/20 ">
            {/* Segmented Bar */}
            <View className="flex-row h-3 rounded-full overflow-hidden mb-4 mt-2">
              <View
                className="h-full"
                style={{
                  width: `${deepWidth}%`,
                  backgroundColor: "#4c51bf", // purple-blue for deep
                }}
              />
              <View
                className="h-full"
                style={{
                  width: `${lightWidth}%`,
                  backgroundColor: "#4299e1", // light blue
                }}
              />
              <View
                className="h-full"
                style={{
                  width: `${remWidth}%`,
                  backgroundColor: "#9f7aea", // soft purple
                }}
              />
            </View>

            {/* Labels */}
            <View className="flex-row justify-between">
              <View className="items-center flex flex-row gap-2">
                <View className="w-2 h-2 rounded-full bg-[#4c51bf] mb-1" />
                <View>
                  <Text className="text-white text-sm">Deep</Text>
                  <Text className="text-slate-400 text-sm">
                    {currentData.deepSleep}
                  </Text>
                </View>
              </View>
              <View className="items-center flex flex-row gap-2">
                <View className="w-2 h-2 rounded-full bg-[#4299e1] mb-1 " />
                <View>
                  <Text className="text-white text-sm">Light</Text>
                  <Text className="text-slate-400 text-sm">
                    {currentData.lightSleep}
                  </Text>
                </View>
              </View>
              <View className="items-center flex flex-row gap-2">
                <View className="w-2 h-2 rounded-full bg-[#9f7aea] mb-1" />
                <View>
                  <Text className="text-white text-sm">REM</Text>
                  <Text className="text-slate-400 text-sm">
                    {currentData.remSleep}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-3xl text-white font-bold ">AI Insights</Text>
          <LinearGradient
            colors={["#312e81","#312e81", "#701a75"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className=" p-4 mb-4 mt-2"
            style={{borderRadius:10}}
          >
            <View className="flex-row justify-between gap-2 items-start my-2 ">
              <View className="bg-indigo-500/20 rounded-full p-2 mr-1">
                <Ionicons name="bulb-outline" size={24} color="#818CF8" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-semibold mb-1">
                  Consistent Wake-Up Time
                </Text>
                <Text className="text-slate-300 text-md">
                  Your deep sleep has increased by 15% this week. Maintaining a
                  consistent wake-up time, even on weekends, could boost this
                  further.
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View className="mb-8 mt-2">
          <Text className="text-3xl text-white font-bold  ">Sleep Goals</Text>
          <LinearGradient
            colors={["#312e81","#312e81", "#3b0764"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className=" p-4  mb-4 mt-2"
            style={{borderRadius:10}}
          >

            <View className="flex-row justify-between items-center mb-3">
              <View>
                <Text className="text-white font-semibold text-xl">
                  Aim for 8 hours
                </Text>
                <Text className="text-slate-400 text-md">
                  103% of goal achieved this week
                </Text>
              </View>

              <View className="bg-indigo-500/20 rounded-full px-3 py-1 flex-row items-center">
                <Ionicons
                  name="moon-outline"
                  size={14}
                  color="#818CF8"
                  style={{ marginRight: 4 }}
                />
                <Text className="text-indigo-400 font-semibold">103%</Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-2 mt-2">
              <TouchableOpacity className="bg-blue-600 rounded-full px-4 py-2 flex-row items-center">
                <Ionicons
                  name="pencil-outline"
                  size={14}
                  color="#94A3B8"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-slate-300 text-sm font-semibold">
                  Edit Goal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-indigo-600 rounded-full px-4 py-2 flex-row items-center">
                <Ionicons
                  name="notifications-outline"
                  size={14}
                  color="white"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-white text-xs font-semibold">
                  Set Reminder
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
