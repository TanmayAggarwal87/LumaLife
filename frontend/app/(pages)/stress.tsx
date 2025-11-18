import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const stress = () => {
  const stressData = [
    { value: 30 },
    { value: 45 },
    { value: 60 },
    { value: 75 },
    { value: 85 },
    { value: 90 },
    { value: 80 },
    { value: 65 },
    { value: 50 },
    { value: 40 },
    { value: 35 },
    { value: 45 },
    { value: 70 },
  ];
  return (
    <ScrollView className="h-full w-full bg-slate-900 px-4">
      <View className="mb-12 flex gap-4">
        <View className="flex justify-center items-center flex-col gap-2">
          <Text className=" text-lg text-gray-400">Today's Stress Level</Text>
          <Text className=" text-5xl tracking-wider font-bold text-white">
            Low
          </Text>
          <Text className=" text-lg text-gray-400">
            Your Resiliance is high today good job
          </Text>
        </View>

        <View className="gap-6">
          {/* Stress Pattern Card */}
          <View className="bg-blue-800/10 rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-white text-xl font-semibold">
                Stress Pattern
              </Text>
              
            </View>

            {/* Line Chart */}
            <LineChart
              data={stressData}
              height={130}
              curved
              color="#60A5FA"
              thickness={4}
              startFillColor="rgba(96, 165, 250,0)"
              endFillColor="rgba(96, 165, 250,0)"
              startOpacity={0.7}
              endOpacity={0.1}
              areaChart
              hideRules
              hideYAxisText
              hideDataPoints
              yAxisThickness={0}
              xAxisThickness={0}
            />
          </View>

          {/*Stress Goal */}
          <View className="bg-blue-800/10 rounded-2xl p-4">
            <Text className="text-white text-xl font-semibold mb-3">
              Your Stress Goal
            </Text>

            <View
              className="flex-row items-center gap-3 rounded-xl p-3 border"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
            >
              <Ionicons name="checkmark-circle" size={28} color="#60A5FA" />
              <View className="flex-1">
                <Text className="text-white text-lg font-medium">
                  Practice mindfulness 15 mins/day
                </Text>
                <Text className="text-md mt-1" style={{ color: "#60A5FA" }}>
                  30%
                </Text>
              </View>
            </View>

            <Text className="text-gray-400 text-sm mt-2 text-center">
              8 of 15 mins logged today
            </Text>
          </View>

          {/* AI Insights */}
          <View className="bg-blue-800/10 rounded-2xl p-4">
            <Text className="text-white text-xl font-semibold mb-3">
              AI-Powered Insights
            </Text>

            <View className="flex-row gap-3">
              <Ionicons name="analytics" size={24} color="#60A5FA" />
              <View className="flex-1">
                <Text className="text-white font-medium mb-1 text-base">
                  Late-night meals seem to correlate with higher morning stress.
                </Text>
                <Text className="text-gray-400 text-sm">
                  Consider eating dinner 3 hours before sleep to improve your
                  morning mood.
                </Text>
              </View>
            </View>
          </View>

          {/* Reduce Your Stress */}
          <View>
            <Text className="text-white text-xl font-semibold mb-3">
              Reduce Your Stress
            </Text>

            <View className="gap-3">
              {/* 5-Minute Meditation */}
              <TouchableOpacity className="bg-blue-800/10 rounded-2xl p-4 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center"
                    style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                  >
                    <Ionicons name="leaf" size={24} color="#60A5FA" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-semibold text-base">
                      5-Minute Meditation
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      Guided session to calm your mind
                    </Text>
                  </View>

                  <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: "#3B82F6" }}
                >
                  <Ionicons name="play" size={18} color="white" />
                </View>
                </View>
                
              </TouchableOpacity>

              {/* Mindful Breathing */}
              <TouchableOpacity className="bg-blue-800/10 rounded-2xl p-4 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center"
                    style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                  >
                    <Ionicons name="water" size={24} color="#60A5FA" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-semibold text-base">
                      Mindful Breathing
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      Quick exercise to center yourself
                    </Text>
                  </View>
                  <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: "#3B82F6" }}
                >
                  <Ionicons name="play" size={18} color="white" />
                </View>
                </View>
                
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
    
  );
};

export default stress;
