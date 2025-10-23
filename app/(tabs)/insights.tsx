import React from "react";
import { ScrollView, Text, View } from "react-native";

const insights = () => {
  return (
    <ScrollView className="h-full w-full bg-slate-900 px-4">
      <View>
        <Text className="text-3xl font-bold text-white">AI Insights</Text>
        <View className="h-52 w-full bg-neutral-900 flex justify-end px-4 py-2 rounded-xl mt-4 gap-4">
          <Text className="text-lime-100 text-3xl font-semibold ">
            You're showing signs of fatigue, try sleeping earlier tonight
          </Text>
          <Text className="text-lime-100 text-xl font-semibold ">
            - LumaLife AI
          </Text>
        </View>
      </View>

      <View className="w-full mt-4">
        
        <View className="mt-4 flex w-full justify-center items-start px-2 gap-4">
          <Text className="text-2xl text-white font-bold mb-2">Activity</Text>
          {/* Steps */}
          <View className="mt-8">
            <Text className="text-xl text-gray-400 font-semibold">
              Step Count
            </Text>
            <Text className="text-[42px] text-white font-bold">5,224</Text>
            <Text className="text-lg text-gray-400 font-semibold">
              Today <Text className="text-green-600 font-semibold">+12%</Text>
            </Text>

            <View className="flex-row justify-between mt-6 items-end h-20 w-full">
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[10%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[60%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[80%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[60%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[60%]" />
            </View>

            <View className="flex-row justify-between mt-2 w-full">
              <Text className="text-gray-500 text-xs">6am</Text>
              <Text className="text-gray-500 text-xs">12pm</Text>
              <Text className="text-gray-500 text-xs">6pm</Text>
              <Text className="text-gray-500 text-xs">12am</Text>
              <Text className="text-gray-500 text-xs">1 am</Text>
            </View>
          </View>

            {/* sleep */}
          <View className="mt-8">
            <Text className="text-xl text-gray-400 font-semibold">
              Sleep
            </Text>
            <Text className="text-[42px] text-white font-bold">8h 10m</Text>
            <Text className="text-lg text-gray-400 font-semibold">
              Today <Text className="text-red-600 font-semibold">-10%</Text>
            </Text>

            <View className="flex-row justify-between mt-6 items-end h-20 w-full">
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[10%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[60%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[80%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[60%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[60%]" />
            </View>

            <View className="flex-row justify-between mt-2 w-full">
              <Text className="text-gray-500 text-xs">6am</Text>
              <Text className="text-gray-500 text-xs">12pm</Text>
              <Text className="text-gray-500 text-xs">6pm</Text>
              <Text className="text-gray-500 text-xs">12am</Text>
              <Text className="text-gray-500 text-xs">1 am</Text>
            </View>
          </View>

          {/* calories */}
          <View className="mt-8 mb-2">
            <Text className="text-xl text-gray-400 font-semibold">
              Food Intake
            </Text>
            <Text className="text-[42px] text-white font-bold">1800 kcal</Text>
            <Text className="text-lg text-gray-400 font-semibold">
              Today <Text className="text-green-600 font-semibold">+12%</Text>
            </Text>

            <View className="flex-row justify-between mt-6 items-end h-20 w-full">
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[10%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[60%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[80%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[60%]" />
              <View className="bg-blue-800/30 rounded-t-full w-10 h-[60%]" />
            </View>

            <View className="flex-row justify-between mt-2 w-full">
              <Text className="text-gray-500 text-xs">6am</Text>
              <Text className="text-gray-500 text-xs">12pm</Text>
              <Text className="text-gray-500 text-xs">6pm</Text>
              <Text className="text-gray-500 text-xs">12am</Text>
              <Text className="text-gray-500 text-xs">1 am</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default insights;
