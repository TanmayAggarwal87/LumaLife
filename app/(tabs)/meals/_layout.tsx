import { Stack } from 'expo-router'
import React from 'react'

const mealLayout = () => {
  return (
   <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="form" />
    </Stack>
  )
}

export default mealLayout