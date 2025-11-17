import { Stack } from 'expo-router'
import React from 'react'

const pagesLayout = () => {
  return (
    <Stack  screenOptions={{headerStyle:{backgroundColor:"#0f172a"},headerShadowVisible:false,headerTransparent:false,headerTitleAlign:"center",headerTitleStyle:{color:"white",fontWeight:"bold"}, headerTintColor: "#fff"}}>
        <Stack.Screen name='sleep' options={{title:"Sleep"}}/>
        <Stack.Screen name='activity' options={{title:"Activity"}}/>
        <Stack.Screen name='nutrition' options={{title:"Nutrition"}}/>
        <Stack.Screen name='stress' options={{title:"Stress"}}/>
    </Stack>


  )
}   

export default pagesLayout