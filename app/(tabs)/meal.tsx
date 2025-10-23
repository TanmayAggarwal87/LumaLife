import React from 'react'
import { Button, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {foodList} from "../../assets/data/food.js"

const meal = () => {
  return (
    <View>
      
      <View className='h-full w-full bg-slate-900 px-4'>
        
      <View>
          <Text className='text-4xl text-white font-bold '>Today</Text>
      </View>

      <View>
        <FlatList
        data={foodList}
        renderItem={({item})=>(
          <View className='bg-blue-800/30 rounded-xl px-3 py-6 flex justify-between items-start flex-row mt-4'>
          <View className='flex gap-1'>
            <Text className='text-lg text-gray-400 font-semibold tracking-wider'>{item.type}</Text>
            <Text className='text-xl text-white font-bold tracking-wider'>{item.name}</Text>
            <Text  className='text-md text-gray-400 font-semibold tracking-wider'>{item.calories} calories</Text>
          </View>
          <View className='mr-2 rounded-xl'>
            <Image source={{uri:item.image}} className='size-20 rounded-xl'/>
          </View>
        </View>
        )}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}/>
        
      </View>
    </View>

     <View className="absolute bottom-6 left-0 right-0 flex-row justify-evenly gap-2">
        <TouchableOpacity className="bg-blue-600 px-8 py-3 rounded-full">
          <Text className="text-white font-semibold text-lg">Scan Food</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-blue-800 px-8 py-3 rounded-full">
          <Text className="text-white font-semibold text-lg">Log Meal</Text>
        </TouchableOpacity>
      </View>

  
    </View>
    
  )
}

export default meal