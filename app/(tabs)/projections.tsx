import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import robo from "../../assets/images/insights.png"
import { Ionicons } from '@expo/vector-icons'

const projections = () => {
  return (
    <ScrollView className='flex-1 bg-slate-900 w-full h-full px-5 pt-10 pb-4'>

      <View className='items-center mb-6'>
        <Text className='text-2xl text-white font-bold'>This is you in 3 months</Text>
      </View>

      <View className='items-center'>
        <View className='bg-[#0A0A0A] w-[340px] h-[340px] rounded-full overflow-hidden'>
          <Image source={robo} className='w-full h-full rounded-full' resizeMode='cover' />
        </View>
      </View>


       <View className="mt-8">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-400 text-sm font-semibold">
            Projection Timeline
          </Text>
          <Text className="text-gray-300 text-sm font-semibold">3 Months</Text>
        </View>

        <View className="h-[4px] bg-slate-800 rounded-full">
          <View className="h-[4px] w-[70px] bg-blue-500 rounded-full" />
        </View>

        <View className="flex-row justify-between mt-1">
          <Text className="text-gray-500 text-xs">Now</Text>
          <Text className="text-gray-500 text-xs">3m</Text>
          <Text className="text-gray-500 text-xs">6m</Text>
          <Text className="text-gray-500 text-xs">1y</Text>
          <Text className="text-gray-500 text-xs">5y</Text>
        </View>
      </View>


      <View className='mt-6 flex gap-4'>
        <View className='bg-slate-800 rounded-2xl p-4'>
          <Text className='text-white text-lg font-semibold'>
            Fatigue Risk Drops by <Text className='text-green-400'>20%</Text>
          </Text>
          <Text className='text-gray-400 mt-1 text-md'>
            Keep this routine and your risk of chronic fatigue is projected to drop significantly.
          </Text>
        </View>

        <View className='bg-slate-800 rounded-2xl p-4'>
          <Text className='text-white text-lg font-semibold'>
            Cardiovascular Health Boosts by <Text className='text-pink-400'>15%</Text>
          </Text>
          <Text className='text-gray-400 mt-1 text-md'>
            Maintaining your current activity level could boost your cardiovascular health in 1 year.
          </Text>
        </View>
      </View>

      <View className='mt-8 mb-10 items-center'>
        <TouchableOpacity className='bg-blue-700/30 opacity-70 px-8 py-3 w-full items-center rounded-xl flex flex-row justify-center gap-3'>
          <Ionicons name="share-outline" color={"white"} size={23}/>
          <Text className='text-white  font-semibold text-lg'>Share My Progress</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
} 

export default projections