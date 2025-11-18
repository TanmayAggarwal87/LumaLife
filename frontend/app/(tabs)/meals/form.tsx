import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const form = () => {
    const [step, setStep] = useState(1);
    const [form,setForm] = useState({
        type:""
    })
    function handleNext(){
        setStep((prev)=>prev+1)
        console.log(form)
    }
    function handleBack(){
        setStep((prev)=>prev+1)
    }
  return (
    <ScrollView className="h-full w-full bg-slate-900 px-4">
      <View className="h-full w-full flex items-center justify-center  ">
        {/* step 1 */}

        {step===1 && (
            <View className="h-full w-full">
        <View className="flex justify-center items-center">
          <Text className="text-white text-3xl font-bold mb-6">
            Choose a Meal
          </Text>
        </View>

        {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
          <TouchableOpacity
            key={meal}
            onPress={() => {
            setForm(prev => ({ ...prev, type: meal }));
            handleNext();
}}
            className="bg-blue-800/10 w-full h-[115px] px-6 py-3 m-2 rounded-3xl flex justify-center items-center "
          >
            <Text className="text-white text-2xl font-semibold tracking-wider">{meal}</Text>
          </TouchableOpacity>   
        ))}

        
      </View>
        )}
        

        {/* step 2 */}
        {step===2 && (
            <View className="h-full w-full">
          <View className="bg-blue-800/20 flex justify-center items-start gap-2 flex-col rounded-2xl px-6 py-2 ">
            <Text className="text-white text-3xl mt-6 font-bold tracking-wider">
              What did you have for Breakfast ?
            </Text>

            <View className="flex-row mt-8 items-center w-full bg-slate-900/70 rounded-3xl px-3 py-2 border border-gray-700">
              <Ionicons
                name="search"
                size={22}
                color="#9CA3AF"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Search for Food Items"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-white text-lg"
              />
            </View>

            <View className="flex justify-start items-start mt-2 gap-2">
              <View className="bg-blue-800/40 px-4 py-2 rounded-full flex flex-row justify-center items-center gap-1">
                <Text className="text-white text-md text-semibold">
                  Oatmeal with berries
                </Text>
                <Ionicons name="close" size={15} color={"white"} />
              </View>
              <View className="bg-blue-800/40 px-4 py-2 rounded-full flex flex-row justify-center items-center gap-1">
                <Text className="text-white text-md text-semibold">
                  Black Coffee
                </Text>
                <Ionicons name="close" size={15} color={"white"} />
              </View>
            </View>

            <View className="h-0.5 bg-gray-700 w-full roudned-full mt-6"></View>

            <View className="w-full mt-2">
              <Text className="text-gray-300 text-base font-semibold mb-4">
                Nutritional Summary
              </Text>

              <View className="flex-row flex-wrap justify-evenly items-center">
                <View className="w-[48%] mb-3 flex items-center">
                  <Text className="text-white text-3xl font-bold">350</Text>
                  <Text className="text-gray-400 text-sm">Calories</Text>
                </View>

                <View className="w-[48%] mb-3 flex items-center ">
                  <Text className="text-white text-2xl font-bold">12g</Text>
                  <Text className="text-gray-400 text-sm">Protein</Text>
                </View>

                <View className="w-[48%] mb-3 flex items-center">
                  <Text className="text-white text-2xl font-bold">55g</Text>
                  <Text className="text-gray-400 text-sm">Carbs</Text>
                </View>

                <View className="w-[48%] mb-3 flex items-center">
                  <Text className="text-white text-2xl font-bold">8g</Text>
                  <Text className="text-gray-400 text-sm">Fat</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-4 flex gap-2">
            <Text className="text-xl text-gray-300 mb-0">Suggestions</Text>

            <View className="flex justify-between items-center flex-row">
              <View className="flex justify-center items-center flex-row gap-4">
                <View className="bg-blue-800/60 rounded-2xl p-3">
                  <Ionicons name="beer-outline" color={"white"} size={26} />
                </View>

                <View>
                  <Text className="text-white text-lg">Protein Smoothie</Text>
                  <Text className="text-gray-400 text-md">
                    {" "}
                    1 large, 300 cal
                  </Text>
                </View>
              </View>

              <View>
                <Ionicons name="add-circle-outline" color={"white"} size={25} />
              </View>
            </View>

            <View className="flex justify-between items-center flex-row">
              <View className="flex justify-center items-center flex-row gap-4">
                <View className="bg-blue-800/60 rounded-2xl p-3">
                  <Ionicons name="pizza-outline" color={"white"} size={26} />
                </View>

                <View>
                  <Text className="text-white text-lg">Pizza</Text>
                  <Text className="text-gray-400 text-md">
                    {" "}
                    1 Slice, 250 cal
                  </Text>
                </View>
              </View>

              <View>
                <Ionicons name="add-circle-outline" color={"white"} size={25} />
              </View>
            </View>
          </View>
        </View>

        )}
        



      </View>
    </ScrollView>
  );
};

export default form;
