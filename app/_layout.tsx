import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  return (
  <Stack  screenOptions={{headerShown:false,headerStyle:{backgroundColor:"#0f172a"},headerShadowVisible:false,headerTransparent:false,headerTitleAlign:"center",headerTitleStyle:{color:"white",fontWeight:"bold"}}}/>
);
}
