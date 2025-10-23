import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const tabsLayout = () => {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#0f172a" },
          headerShadowVisible: false,
          headerTransparent: false,
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white", fontWeight: "bold" },
          tabBarStyle: {
            backgroundColor: "#0f172a",
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 0,
          },

          headerRight: () => (
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={20} color={"white"} />
              </TouchableOpacity>
            ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            title: "LumaLife",
          
          }}
        />
        <Tabs.Screen
          name="meal"
          options={{
            tabBarLabel: "Log Meals",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add" size={size} color={color} />
            ),
            title: "Log Meals",
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            tabBarLabel: "Insights",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bulb" size={size} color={color} />
            ),
            title: "Insights",
          }}
        />
        <Tabs.Screen
          name="projections"
          options={{
            tabBarLabel: "Projections",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trending-up" size={size} color={color} />
            ),
            title: "Projections",
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default tabsLayout;
